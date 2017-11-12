import expect from 'expect';

import MockRedis from '../../src';

describe('lset', () => {
  it('should set the list element at index to value', () => {
    const redis = new MockRedis({
      data: {
        mylist: ['one', 'two', 'three'],
      },
    });

    return redis.lset('mylist', 0, 'four')
      .then(result => expect(result).toBe('OK'))
      .then(() => redis.lset('mylist', -2, 'five'))
      .then(result => expect(result).toBe('OK'))
      .then(() => expect(redis.data.get('mylist')).toEqual(['four', 'five', 'three']));
  });

  it('should throw an exception if the key does not exist', () => {
    const redis = new MockRedis();

    return redis.lset('mylist', 0, 'foo')
      .catch(err => expect(err.message).toBe('no such key'));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.lset('foo', 0, 'bar')
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });

  it('should throw errors when index is out of range', () => {
    const redis = new MockRedis({
      data: {
        mylist: ['one', 'two', 'three'],
      },
    });

    return redis.lset('mylist', 5, 'four')
      .catch((err) => {
        expect(err.message).toBe('index out of range');

        return redis.lset('mylist', -5, 'five');
      })
      .catch(err => expect(err.message).toBe('index out of range'));
  });
});
