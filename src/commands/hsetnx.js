export function hsetnx(key, hashKey, hashVal) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = {};
  }
  const exists = this.data[key].hasOwnProperty(hashKey);
  this.data[key][hashKey] = hashVal;

  return !exists;
}
