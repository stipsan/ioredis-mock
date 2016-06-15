export function decrby(key, decrement = 0) {
  const curVal = Number(this.data[key]);
  this.data[key] = curVal - decrement;
  return this.data[key].toString();
}
