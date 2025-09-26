import EventEmitter from 'events'

import { createData, createSharedData } from '../../src/data'
import { createExpires, createSharedExpires } from '../../src/expires'

describe('createSharedData', () => {
  const modifiedKeysEvents = new EventEmitter()
  const sharedExpires = createSharedExpires()
  const sharedData = createSharedData(sharedExpires, modifiedKeysEvents)
  const expires = createExpires(sharedExpires)
  const data1 = createData(sharedData, expires, { foo: 'bar1' }, 'data1:')
  const data2 = createData(sharedData, expires, { foo: 'bar2' }, 'data2:')

  it('should return all keys and filter by data keyprefix', () => {
    expect(data1.keys()).toEqual(['data1:foo'])
    expect(data2.keys()).toEqual(['data2:foo'])
    expect(sharedData.keys()).toEqual(['data1:foo', 'data2:foo'])
  })

  it('should has all data keys', () => {
    expect(data1.has('foo')).toBe(true)
    expect(data2.has('foo')).toBe(true)
    expect(sharedData.has('data1:foo')).toBe(true)
    expect(sharedData.has('data2:foo')).toBe(true)
  })

  it('should get all data keys', () => {
    expect(data1.get('foo')).toEqual('bar1')
    expect(data2.get('foo')).toEqual('bar2')
    expect(sharedData.get('data1:foo')).toEqual('bar1')
    expect(sharedData.get('data2:foo')).toEqual('bar2')
  })

  it('should be synced with client datas and vice-versa', () => {
    sharedData.set('data1:bar', 'test1')
    sharedData.set('data2:bar', 'test2')
    data1.set('baz', 'foo1')
    data2.set('baz', 'foo2')

    expect(data1.has('bar')).toBe(true)
    expect(data1.get('bar')).toEqual('test1')
    expect(data2.has('bar')).toBe(true)
    expect(data2.get('bar')).toEqual('test2')

    expect(sharedData.has('data1:baz')).toBe(true)
    expect(sharedData.get('data1:baz')).toEqual('foo1')
    expect(sharedData.has('data2:baz')).toBe(true)
    expect(sharedData.get('data2:baz')).toEqual('foo2')
  })

  it('should emit modified key events', () => {
    const modifiedKeys = []
    modifiedKeysEvents.on('modified', key => modifiedKeys.push(key))

    // does not modify data
    data1.get('bar')
    data2.has('bar')
    sharedData.has('data1:baz')
    sharedData.keys('data1:baz')

    // modifies data
    data1.set('foo', 'bar1')
    data2.set('foo', 'bar2')
    sharedData.set('data1:foo', 'bar1')
    sharedData.set('data2:foo', 'bar2')

    expect(modifiedKeys).toEqual([
      'data1:foo',
      'data2:foo',
      'data1:foo',
      'data2:foo',
    ])
  })
})

describe('createData', () => {
  const sharedExpires = createSharedExpires()
  const sharedData = createSharedData(sharedExpires)
  const expires = createExpires(sharedExpires)
  const data = createData(sharedData, expires, { foo: 'bar' })

  it('should check expiry on get', () => {
    expires.set('foo', Date.now())
    expect(data.get('foo')).toBeFalsy()
    expect(sharedData.get('foo')).toBeFalsy()
  })
})

describe('createData with keyprefix', () => {
  const sharedExpires = createSharedExpires()
  const sharedData = createSharedData(sharedExpires)
  const expires = createExpires(sharedExpires, 'test:')
  const data = createData(sharedData, expires, { foo: 'bar' }, 'test:')

  it('should return array keys of data that with keyprefix', () => {
    expect(data.keys()).toEqual(['test:foo'])
    expect(sharedData.keys()).toEqual(['test:foo'])
  })

  it('should check expiry on get with', () => {
    expires.set('foo', Date.now())
    expect(data.get('foo')).toBeFalsy()
    expect(sharedData.get('foo')).toBeFalsy()
  })
})

describe('get', () => {
  let sharedData
  let data

  beforeEach(() => {
    const sharedExpires = createSharedExpires()
    const expires = createExpires(sharedExpires)

    sharedData = createSharedData(sharedExpires)
    data = createData(sharedData, expires, {
      myString: 'qwerty',
      mySet: new Set([1, 2, 3]),
      myBuffer: Buffer.from([0x31, 0x32, 0x33]),
      myArray: [1, 2, 3],
      myObject: { a: 1, b: 2, c: 3 },
    })
  })

  it('should return string values from the cache', () => {
    expect(data.get('myString')).toEqual('qwerty')
    expect(sharedData.get('myString')).toEqual('qwerty')
  })

  it('should return array copies from the cache', () => {
    const myArray = data.get('myArray')
    myArray.push(4)
    expect(data.get('myArray')).toEqual([1, 2, 3])
    expect(sharedData.get('myArray')).toEqual([1, 2, 3])
  })

  it('should return object copies in the cache', () => {
    const myObject = data.get('myObject')
    myObject.d = 4
    expect(data.get('myObject')).toEqual({ a: 1, b: 2, c: 3 })
    expect(sharedData.get('myObject')).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should return set copies from the cache', () => {
    const mySet = data.get('mySet')
    mySet.add(4)
    expect(data.get('mySet')).toEqual(new Set([1, 2, 3]))
    expect(sharedData.get('mySet')).toEqual(new Set([1, 2, 3]))
  })

  it('should return buffer copies from the cache', () => {
    const myBuffer = data.get('myBuffer')
    myBuffer[0] = 0x32
    expect(data.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]))
    expect(sharedData.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]))
  })
})

describe('set', () => {
  let sharedData
  let data

  beforeEach(() => {
    const sharedExpires = createSharedExpires()
    const expires = createExpires(sharedExpires)

    sharedData = createSharedData(sharedExpires)
    data = createData(sharedData, expires, {})
  })

  it('should set string values in the cache', () => {
    data.set('myString', 'qwerty')
    expect(data.get('myString')).toEqual('qwerty')
    expect(sharedData.get('myString')).toEqual('qwerty')
  })

  it('should set copies of arrays in the cache', () => {
    const myArray = [1, 2, 3]
    data.set('myArray', myArray)
    myArray.push(4)
    expect(data.get('myArray')).toEqual([1, 2, 3])
    expect(sharedData.get('myArray')).toEqual([1, 2, 3])
  })

  it('should set copies of objects in the cache', () => {
    const myObject = { a: 1, b: 2, c: 3 }
    data.set('myObject', myObject)
    myObject.d = 4
    expect(data.get('myObject')).toEqual({ a: 1, b: 2, c: 3 })
    expect(sharedData.get('myObject')).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should set copies of sets in the cache', () => {
    const mySet = new Set([1, 2, 3])
    data.set('mySet', mySet)
    mySet.add(4)
    expect(data.get('mySet')).toEqual(new Set([1, 2, 3]))
    expect(sharedData.get('mySet')).toEqual(new Set([1, 2, 3]))
  })

  it('should set copies of buffers in the cache', () => {
    const myBuffer = Buffer.from([0x31, 0x32, 0x33])
    data.set('myBuffer', myBuffer)
    myBuffer[0] = 0x32
    expect(data.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]))
    expect(sharedData.get('myBuffer')).toEqual(Buffer.from([0x31, 0x32, 0x33]))
  })
})
