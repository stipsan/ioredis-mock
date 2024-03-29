export function llen(key) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  return (this.data.get(key) || []).length
}

export const llenBuffer = llen
