import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function auth() {
  return 'OK'
}

export function authBuffer(...args) {
  const val = auth.apply(this, args)
  return convertStringToBuffer(val)
}
