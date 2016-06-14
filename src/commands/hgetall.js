export function hgetall(key) {
  return new Promise(resolve => {
    resolve(this.data[key]);
  });
}
