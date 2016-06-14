export function hget(key, hashKey) {
  return new Promise(resolve => resolve(this.data[key][hashKey]));
}
