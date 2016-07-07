export function append(key, value) {
  if (!{}.hasOwnProperty.call(this.data, key)) {
    this.data[key] = '';
  }
  this.data[key] += value;
  return this.data[key].length.toString();
}
