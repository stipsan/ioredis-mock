export function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

// Based on https://github.com/luin/ioredis/blob/7a9e5fd3aaba55fdc15d25b184078934f270a309/lib/utils/index.ts#L18-L34
export function convertStringToBuffer(value) {
  if (isString(value)) {
    return Buffer.from(value)
  }
  if (Array.isArray(value)) {
    const { length } = value
    const res = Array(length)
    for (let i = 0; i < length; ++i) {
      res[i] = isString(value[i])
        ? Buffer.from(value[i])
        : convertStringToBuffer(value[i])
    }
    return res
  }
  return value
}
