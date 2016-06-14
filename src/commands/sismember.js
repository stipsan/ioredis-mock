export function sismember(key, val) {
  return new Promise(resolve => {
    resolve(this.data[key].indexOf(val) !== -1);
  });
}
