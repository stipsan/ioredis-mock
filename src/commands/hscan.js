import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { scanHelper } from '../commands-utils/scan-command.common'

export function hscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return ['0', []]
  }
  const hKeys = Object.keys(this.data.get(key))
  return scanHelper(hKeys, 1, cursor, ...args)
}

export function hscanBuffer(...args) {
  const val = hscan.apply(this, args)
  return convertStringToBuffer(val)
}
