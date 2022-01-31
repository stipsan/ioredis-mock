export function smembers(key) {
  if (!this.data.has(key)) {
    return []
  }

  return Array.from(this.data.get(key))
}

export function smembersBuffer(...args) {
  const val = smembers.apply(this, args)
  return val.map(Buffer.from)
}
