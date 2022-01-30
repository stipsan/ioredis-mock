export function getset(key, val) {
  const old = this.data.has(key) ? this.data.get(key) : null
  this.data.set(key, val)
  this.expires.delete(key)
  return old
}

export function getsetBuffer(...args) {
  const val = getset.apply(this, args)
  return val ? Buffer.from(val) : val
}
