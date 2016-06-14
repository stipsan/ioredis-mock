export function srem(key, ...vals) {
  vals.forEach(val => {
    const index = this.data[key].indexOf(val);
    this.data[key].splice(index, 1);
  });
  return vals.length;
}
