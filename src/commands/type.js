import isPlainObject from 'lodash.isplainobject'

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

// eslint-disable-next-line consistent-return
export function type(key) {
  if (!this.data.has(key)) {
    return 'none'
  }

  const val = this.data.get(key)

  if (val instanceof Set) {
    return 'set'
  }

  if (val instanceof Map) {
    return 'zset'
  }

  if (Array.isArray(val)) {
    return 'list'
  }

  if (val != null && typeof val.valueOf() === 'string') {
    return 'string'
  }

  if (isPlainObject(val)) {
    return 'hash'
  }
}

export function typeBuffer(key) {
  const val = type.call(this, key)
  return convertStringToBuffer(val)
}
