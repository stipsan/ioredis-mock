export function rpush(key, ...values) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }
  const list = this.data.get(key) || []
  const length = list.push(...values)
  this.data.set(key, list)
  return length
}

export const rpushBuffer = rpush
