export function strlen(key) {
  return this.data.has(key) ? this.data.get(key).length.toString() : '0';
}
