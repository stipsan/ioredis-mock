import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { DIRECTION_REVERSE, RANGE_SCORE, zrangeBaseCommand } from './zrange-command.common';


export function zrevrangebyscore(...args) {
  return zrangeBaseCommand.call(this, args, 0, false, RANGE_SCORE, DIRECTION_REVERSE);
}

export function zrevrangebyscoreBuffer(...args) {
  const val = zrevrangebyscore.apply(this, args)
  return convertStringToBuffer(val)
}
