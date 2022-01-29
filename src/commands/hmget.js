export function hmget(key, ...fields) {
  const hash = this.data.get(key)
  return fields.map(field => {
    if (!hash || hash[field] === undefined) {
      return null
    }
    return hash[field]
  })
}

export function hmgetBuffer(key, ...fields) {
  const val = hmget.apply(this, [key, ...fields])
  return val.map(payload => (payload ? Buffer.from(payload) : payload))
}
