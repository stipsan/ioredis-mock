import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { DIRECTION_REVERSE, zrangeBaseCommand } from './zrange-command.common'

export function zrevrange(...args) {
  return zrangeBaseCommand.call(this, args, 0, false, null, DIRECTION_REVERSE);
}

export function zrevrangeBuffer(...args) {
  const val = zrevrange.apply(this, args)
  return convertStringToBuffer(val)
}
