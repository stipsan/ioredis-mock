import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { scanHelper } from '../commands-utils/scan-command.common'

export function sscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return ['0', []]
  }
  const setKeys = []
  this.data.get(key).forEach(value => setKeys.push(value))
  return scanHelper(setKeys, 1, cursor, ...args)
}

export function sscanBuffer(...args) {
  const val = sscan.apply(this, args)
  return convertStringToBuffer(val)
}
