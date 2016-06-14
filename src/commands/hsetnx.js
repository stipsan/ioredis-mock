export function hsetnx(key, hashKey, hashVal) {
  return new Promise(resolve => {
    if (!this.data.hasOwnProperty(key)) {
      this.data[key] = {};
    }
    const exists = this.data[key].hasOwnProperty(hashKey);
    this.data[key][hashKey] = hashVal;

    resolve(!exists);
  });
}
