export function exists(...keys) {
  return keys.reduce((totalExists, key) => {
    if (this.data.has(key)) {
      return totalExists + 1
    }
    return totalExists
  }, 0)
}

export const existsBuffer = exists
