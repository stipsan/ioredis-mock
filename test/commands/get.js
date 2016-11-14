import MockRedis from '../../src'
import { eventuallyExpect } from '../helpers'

describe('get', () => {

  context('when key does not exist', () => {

    it('should return null', () => {
      const redis = new MockRedis()
      const actual = redis.get('foo')
      return eventuallyExpect(actual).toBe(null)
    })
  })

  context('when key is set to a buffer', () => {

    it('returns the value as a string', () => {
      const redis = new MockRedis()
      const key = 'foo'
      const value = Buffer.from('bar')
      redis.set(key, value)
      return eventuallyExpect(redis.get(key))
        .toBeA('string')
        .toEqual(value.toString())
    })
  })

  context('when key is set to a string', () => {

    it('returns the value as a string', () => {
      const redis = new MockRedis()
      const key = 'foo'
      const value = 'bar'
      redis.set(key, value)
      return eventuallyExpect(redis.get(key))
        .toBeA('string')
        .toEqual(value)
    })
  })
})

describe('getBuffer', () => {

  context('when key does not exist', () => {

    it('should return null', () => {
      const redis = new MockRedis()
      const actual = redis.getBuffer('foo')
      return eventuallyExpect(actual).toBe(null)
    })
  })

  context('when key is set to a buffer', () => {

    it('returns the value as a buffer', () => {
      const redis = new MockRedis()
      const key = 'foo'
      const value = Buffer.from('bar')
      redis.set(key, value)
      return eventuallyExpect(redis.getBuffer(key))
        .toBeA(Buffer)
        .toEqual(value)
    })
  })

  context('when key is set to a string', () => {

    it('returns the value as a buffer', () => {
      const redis = new MockRedis()
      const key = 'foo'
      const value = 'bar'
      redis.set(key, value)
      return eventuallyExpect(redis.getBuffer(key))
        .toBeA(Buffer)
        .toEqual(Buffer.from(value))
    })
  })
})
