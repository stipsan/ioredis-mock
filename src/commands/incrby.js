export function incrby(key, increment = 0) {
  const curVal = Number(this.data.get(key));
  this.data.set(key, (curVal + increment).toString());
  return this.data.get(key);
}
