export function decrby(key, decrement = 0) {
  const curVal = Number(this.data.get(key));
  this.data.set(key, (curVal - decrement).toString());
  return this.data.get(key);
}
