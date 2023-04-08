import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import {
  RANGE_SCORE, zrangeBaseCommand,
} from './zrange-command.common'

export function zrangebyscore(...args) {
  return zrangeBaseCommand.call(this, args, 0, false, RANGE_SCORE);
}

export function zrangebyscoreBuffer(...args) {
  const val = zrangebyscore.apply(this, args)
  return convertStringToBuffer(val)
}
