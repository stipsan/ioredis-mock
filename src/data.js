import { EventEmitter } from 'events'

export function createSharedData(
  sharedExpires,
  modifiedKeyEvents = new EventEmitter()
) {
  let raw = {}

  return Object.freeze({
    clear() {
      raw = {}
    },
    delete(key) {
      if (sharedExpires.has(key)) {
        sharedExpires.delete(key)
      }
      delete raw[key]
      modifiedKeyEvents.emit('modified', key)
    },
    get(key) {
      if (sharedExpires.has(key) && sharedExpires.isExpired(key)) {
        this.delete(key)
      }

      const value = raw[key]

      if (Array.isArray(value)) {
        return value.slice()
      }

      if (Buffer.isBuffer(value)) {
        return Buffer.from(value)
      }

      if (value instanceof Set) {
        return new Set(value)
      }

      if (value instanceof Map) {
        return new Map(value)
      }

      if (typeof value === 'object' && value) {
        return { ...value }
      }

      return value
    },
    has(key) {
      if (sharedExpires.has(key) && sharedExpires.isExpired(key)) {
        this.delete(key)
      }

      return {}.hasOwnProperty.call(raw, key)
    },
    keys(prefix) {
      // First, prune any expired keys before returning the key list
      const allKeys = Object.keys(raw)
      
      // Check each key for expiration and delete if expired
      allKeys.forEach(key => {
        if (sharedExpires.has(key) && sharedExpires.isExpired(key)) {
          this.delete(key)
        }
      })
      
      // Get the updated keys list after pruning
      const keys = Object.keys(raw)

      if (!prefix) return keys

      return keys.filter(key => key.startsWith(prefix))
    },
    set(key, val) {
      let item = val

      if (Array.isArray(val)) {
        item = val.slice()
      } else if (Buffer.isBuffer(val)) {
        item = Buffer.from(val)
      } else if (val instanceof Set) {
        item = new Set(val)
      } else if (val instanceof Map) {
        item = new Map(val)
      } else if (typeof val === 'object' && val) {
        item = { ...val }
      }

      raw[key] = item
      modifiedKeyEvents.emit('modified', key)
    },
  })
}

export function createData(
  sharedData,
  expiresInstance,
  initial = {},
  keyPrefix = ''
) {
  function createInstance(prefix, expires) {
    return Object.freeze({
      clear: () => sharedData.clear(),
      delete: key => sharedData.delete(`${prefix}${key}`),
      get: key => sharedData.get(`${prefix}${key}`),
      has: key => sharedData.has(`${prefix}${key}`),
      keys: () => sharedData.keys(prefix),
      set: (key, val) => sharedData.set(`${prefix}${key}`, val),
      withKeyPrefix(newKeyPrefix) {
        if (newKeyPrefix === prefix) return this
        return createInstance(newKeyPrefix, expires.withKeyPrefix(newKeyPrefix))
      },
    })
  }

  const data = createInstance(keyPrefix, expiresInstance)

  Object.keys(initial).forEach(key => data.set(key, initial[key]))

  return data
}
