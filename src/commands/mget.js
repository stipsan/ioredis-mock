export function mget(...keys) {
  return keys.map((key) => (this.data.has(key) ? this.data.get(key) : null));
}
