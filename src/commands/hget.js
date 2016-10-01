export function hget(key, hashKey) {
  return this.data.get(key)[hashKey];
}
