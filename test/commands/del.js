import expect from 'expect';

import MockRedis from '../../src';

describe('del', () => {
  const redis = new MockRedis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  });
  it('should delete passed in keys', () =>
    redis.del('deleteme', 'metoo').then(status => expect(status).toBe(2))
      .then(() => expect(redis.data.deleteme).toNotExist())
      .then(() => expect(redis.data.metoo).toNotExist())
  );
});
