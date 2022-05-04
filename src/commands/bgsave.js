import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function bgsave() {
  return 'Background saving started'
}

export function bgsaveBuffer() {
  const val = bgsave.apply(this, [])
  return convertStringToBuffer(val)
}
