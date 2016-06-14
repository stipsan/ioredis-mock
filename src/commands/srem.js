export function srem(key, ...vals) {
  return new Promise(resolve => {
    vals.forEach(val => {
      const index = this.data[key].indexOf(val);
      this.data[key].splice(index, 1);
    });
    resolve(vals.length);
  });
}
