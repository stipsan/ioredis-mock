export function expireat(key, at) {
  if (!this.data.has(key)) {
    return 0
  }

  this.expires.set(key, at * 1000)

  return 1
}

export const expireatBuffer = expireat
