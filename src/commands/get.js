export function get(key) {
  return this.data.has(key) ? this.data.get(key) : null
}

export function getBuffer(key) {
  const val = get.apply(this, [key])
  return val ? Buffer.from(val) : val
}
