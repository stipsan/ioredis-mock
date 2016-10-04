export function sismember(key, val) {
  return this.data.get(key).has(val) ? 1 : 0;
}
