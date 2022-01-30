export function ttl(key) {
  if (!this.data.has(key)) {
    return -2
  }

  if (!this.expires.has(key)) {
    return -1
  }

  return Math.ceil((this.expires.get(key) - Date.now()) / 1000)
}

export const ttlBuffer = ttl
