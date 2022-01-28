export function hmget(key, ...fields) {
  const hash = this.data.get(key)
  return fields.map(field => {
    if (!hash || hash[field] === undefined) {
      return null
    }
    return hash[field]
  })
}
