import createData from '../src/data';
import createExpires from '../src/expires';

describe('createData', () => {
  const expires = createExpires();
  const data = createData(expires, { foo: 'bar' });
  it('should check expiry on get', () => {
    expires.set('foo', Date.now());
    expect(data.get('foo')).toBeFalsy();
  });
});

describe('createData with keyprefix', () => {
  const expires = createExpires('test:');
  const data = createData(expires, { foo: 'bar' }, 'test:');

  it('should return array  keys of data that with keyprefix', () => {
    expect(data.keys()).toEqual(['test:foo']);
  });

  it('should check expiry on get with', () => {
    expires.set('foo', Date.now());
    expect(data.get('foo')).toBeFalsy();
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

describe('set', () => {
  let data;

  beforeEach(() => {
    data = createData(createExpires(), {});
  });

  it('should set string values in the cache', () => {
    data.set('myString', 'qwerty');
    expect(data.get('myString')).toEqual('qwerty');
  });

  it('should set copies of arrays in the cache', () => {
    const myArray = [1, 2, 3];
    data.set('myArray', myArray);
    myArray.push(4);
    expect(data.get('myArray')).toEqual([1, 2, 3]);
  });

  it('should set copies of objects in the cache', () => {
    const myObject = { a: 1, b: 2, c: 3 };
    data.set('myObject', myObject);
    myObject.d = 4;
    expect(data.get('myObject')).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should set copies of sets in the cache', () => {
    const mySet = new Set([1, 2, 3]);
    data.set('mySet', mySet);
    mySet.add(4);
    expect(data.get('mySet')).toEqual(new Set([1, 2, 3]));
  });

  it('should set copies of buffers in the cache', () => {
    const myBuffer = Buffer.from([0x31, 0x32, 0x33]);
    data.set('myBuffer', myBuffer);
    myBuffer[0] = 0x32;
    expect(data.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]));
  });
});
