export function decr(key) {
  const curVal = Number(this.data.get(key));
  this.data.set(key, (curVal - 1).toString());
  return this.data.get(key);
}
