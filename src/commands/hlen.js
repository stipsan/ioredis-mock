export function hlen(key) {
  return this.data.has(key) ? Object.keys(this.data.get(key)).length : 0
}

export const hlenBuffer = hlen
