export function srem(key, ...vals) {
  vals.forEach((val) => {
    const index = this.data.get(key).indexOf(val);
    this.data.get(key).splice(index, 1);
  });
  return vals.length;
}
