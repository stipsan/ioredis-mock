export function incr(key) {
  if (!this.data[key]) {
    this.data[key] = '0';
  }
  const curVal = Number(this.data[key]);
  this.data[key] = curVal + 1;
  return this.data[key].toString();
}
