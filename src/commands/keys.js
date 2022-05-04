import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import patternMatchesString from '../commands-utils/patternMatchesString'

export function keys(globString) {
  return this.data.keys().filter(key => patternMatchesString(globString, key))
}

export function keysBuffer(globString) {
  const val = keys.call(this, globString)
  return convertStringToBuffer(val)
}
