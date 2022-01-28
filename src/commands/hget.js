export function hget(key, hashKey) {
  const hash = this.data.get(key)

  if (!hash || hash[hashKey] === undefined) {
    return null
  }

  return hash[hashKey]
}
