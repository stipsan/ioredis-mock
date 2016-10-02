export function hincrbyfloat(key, field, increment) {
  if (!this.data.has(key)) {
    this.data.set(key, { [field]: 0 });
  }
  if (!{}.hasOwnProperty.call(this.data.get(key), field)) {
    this.data.get(key)[field] = 0;
  }
  const curVal = parseFloat(this.data.get(key)[field]);
  this.data.get(key)[field] = (curVal + parseFloat(increment)).toString();
  return this.data.get(key)[field];
}
