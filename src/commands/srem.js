export function srem(key, ...vals) {
  if (!this.data.has(key)) {
    return 0
  }
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }

  let removed = 0
  const set = this.data.get(key)
  vals.forEach(val => {
    if (set.has(val)) {
      removed++
    }
    set.delete(val)
  })

  if (set.size === 0) {
    this.data.delete(key)
  } else {
    this.data.set(key, set)
  }

  return removed
}

export const sremBuffer = srem
