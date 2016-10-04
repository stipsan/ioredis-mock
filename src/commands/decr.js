export function decr(key) {
  const curVal = Number(this.data.get(key));
  const nextVal = curVal - 1;
  this.data.set(key, nextVal.toString());
  return nextVal;
}
