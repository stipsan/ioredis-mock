export function strlen(key) {
  return this.data.has(key) ? this.data.get(key).length : 0
}

export const strlenBuffer = strlen
