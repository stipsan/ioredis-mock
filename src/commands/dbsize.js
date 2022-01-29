export function dbsize() {
  return this.data.keys().length
}

export const dbsizeBuffer = dbsize
