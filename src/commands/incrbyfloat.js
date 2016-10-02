export function incrbyfloat(key, increment) {
  const curVal = parseFloat(this.data.get(key));
  this.data.set(key, (curVal + parseFloat(increment)).toString());
  return this.data.get(key);
}
