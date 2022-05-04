import shuffle from 'lodash.shuffle'

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import sample from '../commands-utils/sample'
import { type } from './index'

export function hrandfield(key, count, WITHVALUES) {
  if (!key) {
    throw new Error("ERR wrong number of arguments for 'hrandfield' command")
  }

  if (!this.data.has(key)) {
    return null
  }

  if (type.call(this, key) !== 'hash') {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }

  const hash = this.data.get(key)
  const keys = Object.keys(hash)

  if (!count) {
    return sample(keys)
  }

  let result = []
  if (count > 0) {
    result = shuffle(keys).slice(0, count)
  }

  if (count < 0) {
    const max = count * -1
    for (let index = 0; index < max; index++) {
      result.push(sample(keys))
    }
  }

  if (WITHVALUES && WITHVALUES.toUpperCase() === 'WITHVALUES') {
    return result.reduce((list, item) => list.concat(item, hash[item]), [])
  }
  return result
}

export function hrandfieldBuffer(...args) {
  const val = hrandfield.apply(this, args)
  return convertStringToBuffer(val)
}
