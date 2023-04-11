import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import {
  RANGE_LEX,
  zrangeBaseCommand,
} from './zrange-command.common'

export function zrangebylex(...args) {
  return zrangeBaseCommand.call(this, args, 0, false, RANGE_LEX);
}

export function zrangebylexBuffer(...args) {
  const val = zrangebylex.apply(this, args)
  return convertStringToBuffer(val)
}
