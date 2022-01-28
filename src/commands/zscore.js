export function zscore(key, member) {
  const map = this.data.get(key)

  // @TODO investigate a more stable way to detect sorted lists
  if (!map || !(map instanceof Map)) {
    return null
  }

  const entry = map.get(member)

  if (!entry) {
    return null
  }

  return entry.score.toString()
}
