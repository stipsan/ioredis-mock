export function hsetnx(key, hashKey, hashVal) {
  if (!{}.hasOwnProperty.call(this.data, key)) {
    this.data[key] = {};
  }

  if (!{}.hasOwnProperty.call(this.data[key], hashKey)) {
    this.data[key][hashKey] = hashVal;

    return '1';
  }

  return '0';
}
