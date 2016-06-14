export function set(key, value) {
  return new Promise(resolve => {
    this.data[key] = value;
    resolve('OK');
  });
}
