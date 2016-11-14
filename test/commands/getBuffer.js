import expect from 'expect'
import MockRedis from '../../src'
import { eventuallyExpect } from '../helpers'

describe('getBuffer', () => {

  let redis

  beforeEach(() => {
    redis = new MockRedis()
  })

  context('when key does not exist', () => {

    it('should return null', () => {
      const actual = redis.getBuffer('foo')
      return eventuallyExpect(actual).toBe(null)
    })
  })

  context('when value for key is a buffer', () => {

    const key = 'foo'
    const value = Buffer.from('bar')

    beforeEach(() => {
      redis.set(key, value)
    })

    it('returns a buffer', () => {
      return eventuallyExpect(redis.getBuffer(key)).toBeA(Buffer)
    })

    it('returns the correct value', () => {
      return eventuallyExpect(redis.getBuffer(key)).toEqual(value)
    })
  })

  context('when value for key is a string', () => {

    const key = 'foo'
    const value = 'bar'

    beforeEach(() => {
      redis.set(key, value)
    })

    it('returns a buffer', () => {
      return eventuallyExpect(redis.getBuffer(key)).toBeA(Buffer)
    })

    it('returns the correct value', () => {
      return eventuallyExpect(redis.getBuffer(key)).toEqual(Buffer.from(value))
    })
  })
})
