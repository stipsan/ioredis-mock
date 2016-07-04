export function hsetnx(key, hashKey, hashVal) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = {};
  }

  if (!this.data[key].hasOwnProperty(hashKey)) {
    this.data[key][hashKey] = hashVal;

    return '1';
  }

  return '0';
}
