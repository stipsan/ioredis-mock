export function get(key) {
  return this.data.has(key) ? this.data.get(key) : null;
}
