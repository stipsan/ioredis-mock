import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import random from '../commands-utils/random'

export function randomkey() {
  const keys = this.data.keys()
  return keys.length > 0 ? keys[random(0, keys.length - 1)] : null
}

export function randomkeyBuffer() {
  const val = randomkey.call(this)
  return convertStringToBuffer(val)
}
