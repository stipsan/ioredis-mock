import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function echo(message) {
  return message
}

export function echoBuffer(message) {
  const val = echo.call(this, message)
  return convertStringToBuffer(val)
}
