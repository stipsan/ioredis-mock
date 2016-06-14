export function smembers(key) {
  return new Promise(resolve => {
    resolve(this.data[key]);
  });
}
