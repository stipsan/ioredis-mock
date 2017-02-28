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

describe('get', () => {
  let data;

  beforeEach(() => {
    data = createData(createExpires(), {
      myString: 'qwerty',
      mySet: new Set([1, 2, 3]),
      myBuffer: Buffer.from([0x31, 0x32, 0x33]),
      myArray: [1, 2, 3],
      myObject: { a: 1, b: 2, c: 3 },
    });
  });

  it('should return string values from the cache', () => {
    expect(data.get('myString')).toEqual('qwerty');
  });

  it('should return array copies from the cache', () => {
    const myArray = data.get('myArray');
    myArray.push(4);
    expect(data.get('myArray')).toEqual([1, 2, 3]);
  });

  it('should return object copies in the cache', () => {
    const myObject = data.get('myObject');
    myObject.d = 4;
    expect(data.get('myObject')).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should return set copies from the cache', () => {
    const mySet = data.get('mySet');
    mySet.add(4);
    expect(data.get('mySet')).toEqual(new Set([1, 2, 3]));
  });

  it('should return buffer copies from the cache', () => {
    const myBuffer = data.get('myBuffer');
    myBuffer[0] = 0x32;
    expect(data.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]));
  });
});
