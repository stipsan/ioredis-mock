export function hset(key, hashKey, hashVal) {
  this.data.get(key)[hashKey] = hashVal;
  return 'OK';
}
