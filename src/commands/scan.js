import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { scanHelper } from '../commands-utils/scan-command.common'

export function scan(cursor, opt1, opt1val, opt2, opt2val) {
  const allKeys = this.data.keys()
  return scanHelper(allKeys, 1, cursor, opt1, opt1val, opt2, opt2val)
}
export function scanBuffer(...args) {
  const val = scan.apply(this, args)
  return convertStringToBuffer(val)
}
