export function pexpireat(key, at) {
  if (!this.data.has(key)) {
    return 0
  }

  this.expires.set(key, at)

  return 1
}
