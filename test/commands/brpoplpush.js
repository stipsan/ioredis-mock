import expect from 'expect';
import MockRedis from '../../src';
import {
  createStringItems,
  createBufferItems,
  eventuallyExpect
} from '../helpers'

describe('brpoplpush', sharedTests(false, createStringItems()))
describe('brpoplpushBuffer', sharedTests(true, createBufferItems()))

function sharedTests(isBuffer, items) {

  const command = 'brpoplpush' + (isBuffer ? 'Buffer' : '');
  const getter = 'get' + (isBuffer ? 'Buffer' : '');

  return () => {
    it('should remove one item from the tail of the source list', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        fooItems = items(2),
        remaining = fooItems.slice(0,1)

      redis.rpush(fooKey, ...fooItems)

      return redis[command](fooKey, '')
        .then(() =>
          eventuallyExpect(redis[getter](fooKey))
            .toEqual(remaining));
    });

    it('should add one item to the head of the destination list', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar',
        fooItems = items(2),
        barItems = items(2),
        expected = fooItems.slice(1).concat(barItems)

      redis.rpush(fooKey, ...fooItems)
      redis.rpush(barKey, ...barItems)

      return redis[command](fooKey, barKey)
        .then(() =>
          eventuallyExpect(redis[getter](barKey))
            .toEqual(expected)
        );
    });

    it('should return null if the source list does not exist', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar'

      return
        eventuallyExpect(redis[command](fooKey, barKey))
          .toEqual(null);
    });

    it('should return null if the source list is empty', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar'

      redis.rpush(fooKey)

      return
        eventuallyExpect(redis[command](fooKey, barKey))
          .toEqual(null);
    });

    it('should return the item', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar',
        fooItems = items(2),
        expected = fooItems[1]

      redis.rpush(fooKey, ...fooItems)

      return
        eventuallyExpect(redis[command](fooKey, barKey))
          .toEqual(expected);
    });

    it('should throw an exception if the source key contains something other than a list', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar'

      redis.set(fooKey, 'foo')

      return redis[command](fooKey, barKey)
        .catch(err =>
          expect(err.message)
            .toBe(`Key ${fooKey} does not contain a list`));
    });

    it('should throw an exception if the destination key contains something other than a list', () => {

      const
        redis = new MockRedis(),
        fooKey = 'foo',
        barKey = 'bar'

      redis.set(barKey, 'foo')

      return redis[command](fooKey, barKey)
        .catch(err =>
          expect(err.message)
            .toBe(`Key ${barKey} does not contain a list`));
      });
  };
}
