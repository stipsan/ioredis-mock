import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { expire } from './index'

function createGroupedArray(arr, groupSize) {
  const groups = []
  for (let i = 0; i < arr.length; i += groupSize) {
    groups.push(arr.slice(i, i + groupSize))
  }
  return groups
}

export function set(key, value, ...options) {
  const nx = options.indexOf('NX') !== -1
  const xx = options.indexOf('XX') !== -1
  const filteredOptions = options.filter(
    option => option !== 'NX' && option !== 'XX'
  )

  if (nx && xx) throw new Error('ERR syntax error')
  if (nx && this.data.has(key)) return null
  if (xx && !this.data.has(key)) return null

  let result = 'OK'
  if (options.indexOf('GET') !== -1) {
    result = this.data.has(key) ? this.data.get(key) : null
  }

  this.data.set(key, value)

  const expireOptions = new Map(createGroupedArray(filteredOptions, 2))
  const ttlSeconds = expireOptions.get('EX') || expireOptions.get('PX') / 1000.0

  if (ttlSeconds) {
    expire.call(this, key, ttlSeconds)
  } else {
    this.expires.delete(key)
  }

  return result
}

export function setBuffer(...args) {
  const val = set.apply(this, args)
  return convertStringToBuffer(val)
}
