export function hgetall(key) {
  return this.data.get(key) || {}
}

export function hgetallBuffer(key) {
  const val = hgetall.apply(this, [key])
  Object.keys(val).forEach(keyInObject => {
    val[keyInObject] = Buffer.from(val[keyInObject])
  })

  return val
}
