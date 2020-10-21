import expect from 'expect';

import MockRedis from '../../src';

describe('role', () => {
  it('should return role info on the current redis instance', () => {
    const redis = new MockRedis();

    return redis.role().then((result) => expect(result).toEqual(['master', 0]));
  });

  it('should return slave info');
});
