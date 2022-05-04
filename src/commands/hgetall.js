import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function hgetall(key) {
  return this.data.get(key) || {}
}

export function hgetallBuffer(key) {
  const val = hgetall.apply(this, [key])
  Object.keys(val).forEach(keyInObject => {
    val[keyInObject] = convertStringToBuffer(val[keyInObject])
  })

  return val
}
