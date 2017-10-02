import Set from 'es6-set';
import semver from 'semver';
import expect from 'expect';

import createBuffer from '../src/buffer';
import createData from '../src/data';
import createExpires from '../src/expires';

const shouldSkip = semver.lt(process.versions.node, '0.11.0')

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
      myBuffer: createBuffer([0x31, 0x32, 0x33]),
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

  it('should return buffer copies from the cache', function () {
    if (shouldSkip) {
      this.skip();
    }
    const myBuffer = data.get('myBuffer');
    myBuffer[0] = 0x32;
    expect(data.get('myBuffer')).toEqual(createBuffer([0x31, 0x32, 0x33]));
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

  it('should set copies of buffers in the cache', function () {
    if (shouldSkip) {
      this.skip();
    }
    const myBuffer = createBuffer([0x31, 0x32, 0x33]);
    data.set('myBuffer', myBuffer);
    myBuffer[0] = 0x32;
    expect(data.get('myBuffer')).toEqual(createBuffer([0x31, 0x32, 0x33]));
  });
});
