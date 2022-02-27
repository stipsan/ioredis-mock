export function get(key) {
  const value = this.data.has(key) ? this.data.get(key) : null

  if (Buffer.isBuffer(value)) {
    return value.toString()
  }

  return value
}

export function getBuffer(key) {
  const value = this.data.has(key) ? this.data.get(key) : null

  if (value && !Buffer.isBuffer(value)) {
    return Buffer.from(value)
  }

  return value
}
