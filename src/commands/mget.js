export function mget(...keys) {
  return keys.map(key => (this.data.has(key) ? this.data.get(key) : null))
}

export function mgetBuffer(...args) {
  const val = mget.apply(this, args)
  return val.map(payload => (payload ? Buffer.from(payload) : payload))
}
