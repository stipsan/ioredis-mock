import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function time() {
  return [
    `${Math.round(new Date().getTime() / 1000)}`,
    `${Math.round(process.hrtime()[1] / 1000)}`,
  ]
}

export function timeBuffer() {
  const val = time.call(this)
  return convertStringToBuffer(val)
}
