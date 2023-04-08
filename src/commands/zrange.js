import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { zrangeBaseCommand } from './zrange-command.common'

export function zrange(...args) {
  return zrangeBaseCommand.call(this, args)
}

export function zrangeBuffer(...args) {
  const val = zrange.apply(this, args)
  return convertStringToBuffer(val)
}
