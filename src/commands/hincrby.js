export function hincrby(key, field, increment = 0) {
  if (!this.data.has(key)) {
    this.data.set(key, { [field]: 0 });
  }
  if (!{}.hasOwnProperty.call(this.data.get(key), field)) {
    this.data.get(key)[field] = 0;
  }
  const curVal = Number(this.data.get(key)[field]);
  this.data.get(key)[field] = curVal + increment;
  return this.data.get(key)[field].toString();
}
