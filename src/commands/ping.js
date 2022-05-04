import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function ping(message = 'PONG') {
  return message
}

export function pingBuffer(message) {
  const val = ping.call(this, message)
  return convertStringToBuffer(val)
}
