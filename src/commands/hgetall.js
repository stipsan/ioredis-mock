export function hgetall(key) {
  return this.data.get(key) || {};
}
