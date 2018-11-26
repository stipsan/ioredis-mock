import expect from 'expect';

import MockRedis from '../../src';

describe('hdel', () => {
  const redis = new MockRedis({
    data: {
      'user:1': {
        id: '1',
        email: 'bruce@wayne.enterprises',
        name: 'Bruce Wayne',
      },
    },
  });
  it('should delete passed in keys from hash map', () =>
    redis
      .hdel('user:1', 'id', 'email', 'location')
      .then(status => expect(status).toBe(2))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({ name: 'Bruce Wayne' })
      ));

  it('should return 0 for key that does not exist', done => {
    redis
      .hdel('nonExistingUser', 'someField')
      .then(status => expect(status).toBe(0))
      .then(() => done())
      .catch(err => done(err));
  });
});
