export function decr(key) {
  const curVal = Number(this.data[key]);
  this.data[key] = curVal - 1;
  return this.data[key].toString();
}
