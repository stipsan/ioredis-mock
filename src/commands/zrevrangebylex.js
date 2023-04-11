import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import {
  DIRECTION_REVERSE,
  RANGE_LEX,
  zrangeBaseCommand,
} from './zrange-command.common'

export function zrevrangebylex(...args) {
  return zrangeBaseCommand.call(this, args, 0, false, RANGE_LEX, DIRECTION_REVERSE);
}

export function zrevrangebylexBuffer(...args) {
  const val = zrevrangebylex.apply(this, args)
  return convertStringToBuffer(val)
}
