import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export async function info() {
  const json = await import('../../data/info.json')
  return json.default || json
}

export async function infoBuffer() {
  const val = await info.call(this)
  return convertStringToBuffer(val)
}
