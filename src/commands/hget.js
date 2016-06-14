export function hget(key, hashKey) {
  return this.data[key][hashKey];
}
