import MockRedis from '../../src'
import { eventuallyExpect } from '../helpers'

describe('get', () => {

  context('when key does not exist', () => {

    const
      redis = new MockRedis(),
      actual = redis.get('foo')

    it('should return null', () =>
      eventuallyExpect(actual).toBe(null)
    )
  })

  context('when key is set to a buffer', () => {

    const
      redis = new MockRedis(),
      key = 'foo',
      value = Buffer.from('bar')

    redis.set(key, value)

    it('returns the value as a string', () =>
      eventuallyExpect(redis.get(key))
        .toBeA('string')
        .toEqual(value.toString())
    )
  })

  context('when key is set to a string', () => {

    const
      redis = new MockRedis(),
      key = 'foo',
      value = 'bar'

    redis.set(key, value)

    it('returns the value as a string', () =>
      eventuallyExpect(redis.get(key))
        .toBeA('string')
        .toEqual(value)
    )
  })
})

describe('getBuffer', () => {

  context('when key does not exist', () => {

    const
      redis = new MockRedis(),
      actual = redis.getBuffer('foo')

    it('should return null', () =>
      eventuallyExpect(actual).toBe(null)
    )
  })

  context('when key is set to a buffer', () => {

    const
      redis = new MockRedis(),
      key = 'foo',
      value = Buffer.from('bar')

    redis.set(key, value)

    it('returns the value as a buffer', () =>
      eventuallyExpect(redis.getBuffer(key))
        .toBeA(Buffer)
        .toEqual(value)
    )
  })

  context('when key is set to a string', () => {

    const
      redis = new MockRedis(),
      key = 'foo',
      value = 'bar'

    redis.set(key, value)

    it('returns the value as a buffer', () =>
      eventuallyExpect(redis.getBuffer(key))
        .toBeA(Buffer)
        .toEqual(Buffer.from(value))
    )
  })
})
