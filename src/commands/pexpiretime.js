export function pexpiretime(key) {
  if (!this.data.has(key)) {
    return -2
  }

  if (!this.expires.has(key)) {
    return -1
  }

  return this.expires.get(key)
}

export const pexpiretimeBuffer = pexpiretime
