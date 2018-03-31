import expect from 'expect';

import createBuffer from '../../src/buffer';
import MockRedis from '../../src';

describe('lpopBuffer', () => {
  it('should remove and return first element of list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['3', '2', '1'],
      },
    });

    return redis
      .lpopBuffer('foo')
      .then(result => expect(result).toBe('3'))
      .then(() => expect(redis.data.get('foo')).toEqual(['2', '1']));
  });

  it('should return buffer values correctly', () => {
    const bufferVal = createBuffer('bar');
    const redis = new MockRedis({
      data: {
        foo: [bufferVal, '2', '1'],
      },
    });

    return redis
      .lpopBuffer('foo')
      .then(result => expect(result).toBe(bufferVal));
  });

  it('should return null on empty list', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
      },
    });

    return redis.lpopBuffer('foo').then(result => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .lpopBuffer('foo')
      .catch(err =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });
});
