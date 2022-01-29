export function get(key) {
  const value = this.data.has(key) ? this.data.get(key) : null

  if (Buffer.isBuffer(value)) {
    return value.toString()
  }

  return value
}

export function getBuffer(key) {
  const val = get.apply(this, [key])
  return val ? Buffer.from(val) : val
}
