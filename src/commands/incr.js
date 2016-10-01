export function incr(key) {
  if (!this.data.has(key)) {
    this.data.set(key, '0');
  }
  const curVal = Number(this.data.get(key));
  this.data.set(key, (curVal + 1).toString());
  return this.data.get(key);
}
