export function hsetnx(key, hashKey, hashVal) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  if (!{}.hasOwnProperty.call(this.data.get(key), hashKey)) {
    this.data.get(key)[hashKey] = hashVal;

    return 1;
  }

  return 0;
}
