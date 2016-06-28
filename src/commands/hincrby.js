export function hincrby(key, field, increment = 0) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = { [field]: 0 };
  }
  if (!this.data[key].hasOwnProperty(field)) {
    this.data[key][field] = 0;
  }
  const curVal = Number(this.data[key][field]);
  this.data[key][field] = curVal + increment;
  return this.data[key][field].toString();
}
