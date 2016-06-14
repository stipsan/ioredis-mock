export function hset(key, hashKey, hashVal) {
  return new Promise(resolve => {
    this.data[key][hashKey] = hashVal;
    resolve('OK');
  });
}
