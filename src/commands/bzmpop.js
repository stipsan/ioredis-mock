import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function bzmpop(...args) {
  return this.zmpop(...args)
}

export async function bzmpopBuffer(...args) {
  const val = await bzmpop.call(this, ...args)
  return convertStringToBuffer(val)
}
