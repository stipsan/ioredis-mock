import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { scanHelper } from '../commands-utils/scan-command.common'

export function hscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return ['0', []]
  }
  const entries = Object.entries(this.data.get(key))
  const [cur, pairs] = scanHelper(entries, 1, cursor, ...args)
  return [cur, pairs.flat()]
}

export function hscanBuffer(...args) {
  const val = hscan.apply(this, args)
  return convertStringToBuffer(val)
}
