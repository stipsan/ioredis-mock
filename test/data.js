import expect from 'expect';

import createData from '../src/data';
import createExpires from '../src/expires';

describe('createData', () => {
  const expires = createExpires();
  const data = createData(expires, { foo: 'bar' });
  it('should check expiry on get', () => {
    expires.set('foo', Date.now());
    expect(data.get('foo')).toNotExist();
  });
});
