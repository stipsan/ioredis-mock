export function hset(key, hashKey, hashVal) {
  this.data[key][hashKey] = hashVal;
  return 'OK';
}
