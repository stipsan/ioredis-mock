export function sismember(key, val) {
  return this.data.get(key).indexOf(val) !== -1;
}
