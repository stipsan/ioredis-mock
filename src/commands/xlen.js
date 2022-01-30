export function xlen(stream) {
  return (this.data.get(stream) || []).length
}

export const xlenBuffer = xlen
