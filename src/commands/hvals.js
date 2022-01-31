export function hvals(key) {
  if (!this.data.has(key)) {
    return []
  }

  return Object.values(this.data.get(key))
}

export function hvalsBuffer(key) {
  const val = hvals.call(this, key)
  return val.map(Buffer.from)
}
