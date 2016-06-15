export function incrby(key, increment = 0) {
  const curVal = Number(this.data[key]);
  this.data[key] = curVal + increment;
  return this.data[key].toString();
}
