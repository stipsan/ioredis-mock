export function expiretime(key) {
  if (!this.data.has(key)) {
    return -2
  }

  if (!this.expires.has(key)) {
    return -1
  }

  return Math.round(this.expires.get(key) / 1000)
}

export const expiretimeBuffer = expiretime
