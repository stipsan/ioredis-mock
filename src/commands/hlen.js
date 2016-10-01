export function hlen(key) {
  return this.data.has(key) ? Object.keys(this.data.get(key)).length.toString() : '0';
}
