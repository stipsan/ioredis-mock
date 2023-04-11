import Chance from 'chance'
import Redis from 'ioredis'
import zipObject from 'lodash.zipobject'
import { ObjectWritableMock } from 'stream-mock'

const chance = new Chance()

// @TODO Rewrite test suite so it runs on a real Redis instance
;(process.env.IS_E2E ? describe.skip : describe)('hscanStream', () => {
  let writable
  const randomCCType = () => chance.cc_type({ raw: true })
  const createHashSet = keys => zipObject(keys, keys.map(randomCCType))

  beforeEach(() => {
    writable = new ObjectWritableMock()
  })

  it('should return null array if nothing in db', done => {
    // Given
    const redis = new Redis()
    const stream = redis.hscanStream('key')
    // When
    stream.pipe(writable)
    writable.on('finish', () => {
      // Then
      expect(writable.data).toEqual([])
      done()
    })
  })

  it('should return keys in db', done => {
    const redis = new Redis({
      data: {
        hset: createHashSet(['foo', 'bar']),
      },
    })
    const stream = redis.hscanStream('hset')
    // When
    stream.pipe(writable)
    writable.on('finish', () => {
      // Then
      expect([].concat(...writable.data)).toEqual(['foo', 'bar'])
      done()
    })
  })

  it('should batch by count', done => {
    // Given
    const keys = chance.unique(chance.word, 100)
    const count = 11
    const redis = new Redis({ data: { hset: createHashSet(keys) } })
    const stream = redis.hscanStream('hset', { count })
    // When
    stream.pipe(writable)
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(keys.length / count))
      expect([].concat(...writable.data)).toEqual(keys)
      done()
    })
  })

  it('should return only mathced keys', done => {
    // Given
    const redis = new Redis({
      data: {
        hset: createHashSet(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    })
    const stream = redis.hscanStream('hset', { match: 'foo*' })
    // When
    stream.pipe(writable)
    writable.on('finish', () => {
      // Then
      expect([].concat(...writable.data)).toEqual(['foo0', 'foo1', 'foo2'])
      done()
    })
  })

  it('should return only mathced keys by count', done => {
    // Given
    const redis = new Redis({
      data: {
        hset: createHashSet(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    })
    const stream = redis.hscanStream('hset', { match: 'foo*', count: 1 })
    // When
    stream.pipe(writable)
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(3))
      expect([].concat(...writable.data)).toEqual(['foo0', 'foo1', 'foo2'])
      done()
    })
  })

  it('should fail if incorrect count usage', done => {
    // Given
    const redis = new Redis({
      data: {
        hset: createHashSet(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    })
    const stream = redis.hscanStream('hset', { count: 'ZU' })
    // When
    stream.pipe(writable)
    stream.on('error', err => {
      // Then
      expect(err).toBeInstanceOf(Error)
      done()
    })
    writable.on('finish', () => done(new Error('should not finish')))
  })
})
