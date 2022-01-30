export function hstrlen(key, field) {
  if (!key || !field) {
    throw new Error("ERR wrong number of arguments for 'hstrlen' command")
  }

  return this.data.has(key) && {}.hasOwnProperty.call(this.data.get(key), field)
    ? this.data.get(key)[field].length
    : 0
}

export const hstrlenBuffer = hstrlen
