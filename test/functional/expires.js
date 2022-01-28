import { createExpires, createSharedExpires } from '../../src/expires'

describe('createSharedExpires', () => {
  const sharedExpires = createSharedExpires()

  it('should implement get, set, has and delete lifecycle hooks', () => {
    expect(sharedExpires.has('foo')).toBe(false)

    const expireAt = Date.now()
    sharedExpires.set('foo', expireAt)

    expect(sharedExpires.has('foo')).toBe(true)

    expect(sharedExpires.get('foo')).toBe(expireAt)

    expect(sharedExpires.isExpired('foo')).toBe(true)

    sharedExpires.delete('foo')
    expect(sharedExpires.has('foo')).toBe(false)

    sharedExpires.set('foo', Date.now() + 1000)
    expect(sharedExpires.isExpired('foo')).toBe(false)
  })
})

describe('createSharedExpires', () => {
  const sharedExpires = createSharedExpires()

  it('should implement get, set, has and delete lifecycle hooks', () => {
    const expires = createExpires(sharedExpires)

    expect(expires.has('bar')).toBe(false)
    expect(sharedExpires.has('bar')).toBe(false)

    const expireAt = Date.now()
    expires.set('bar', expireAt)

    expect(expires.has('bar')).toBe(true)
    expect(sharedExpires.has('bar')).toBe(true)

    expect(expires.get('bar')).toBe(expireAt)
    expect(sharedExpires.get('bar')).toBe(expireAt)

    expect(expires.isExpired('bar')).toBe(true)
    expect(sharedExpires.isExpired('bar')).toBe(true)

    expires.delete('bar')
    expect(expires.has('bar')).toBe(false)
    expect(sharedExpires.has('bar')).toBe(false)

    expires.set('bar', Date.now() + 1000)
    expect(expires.isExpired('bar')).toBe(false)
    expect(sharedExpires.isExpired('bar')).toBe(false)
  })

  it('should implement get, set, has and delete lifecycle hooks with keyprefix', () => {
    const expires = createExpires(sharedExpires, 'foo:')

    expect(expires.has('bar')).toBe(false)
    expect(sharedExpires.has('foo:bar')).toBe(false)

    const expireAt = Date.now()
    expires.set('bar', expireAt)

    expect(expires.has('bar')).toBe(true)
    expect(sharedExpires.has('foo:bar')).toBe(true)

    expect(expires.get('bar')).toBe(expireAt)
    expect(sharedExpires.get('foo:bar')).toBe(expireAt)

    expect(expires.isExpired('bar')).toBe(true)
    expect(sharedExpires.isExpired('foo:bar')).toBe(true)

    expires.delete('bar')
    expect(expires.has('bar')).toBe(false)
    expect(sharedExpires.has('foo:bar')).toBe(false)

    expires.set('bar', Date.now() + 1000)
    expect(expires.isExpired('bar')).toBe(false)
    expect(sharedExpires.isExpired('foo:bar')).toBe(false)
  })
})
