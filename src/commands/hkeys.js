export function hkeys(key) {
  return this.data.has(key) ? Object.keys(this.data.get(key)) : [];
}
