export function get(key) {
  return this.data.has(key) ? this.data[key] : null;
}
