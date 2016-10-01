import expect from 'expect';

import createExpires from '../src/expires';

describe('createExpires', () => {
  const expires = createExpires();
  it('should implement get, set, has and delete lifecycle hooks', () => {
    expect(expires.has('foo')).toBe(false);

    const expireAt = Date.now();
    expires.set('foo', expireAt);

    expect(expires.has('foo')).toBe(true);

    expect(expires.get('foo')).toBe(expireAt);

    expect(expires.isExpired('foo')).toBe(true);

    expires.delete('foo');
    expect(expires.has('foo')).toBe(false);

    expires.set('foo', Date.now() + 1000);
    expect(expires.isExpired('foo')).toBe(false);
  });
});
