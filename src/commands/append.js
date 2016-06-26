export function append(key, value) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = '';
  }
  this.data[key] += value;
  return this.data[key].length.toString();
}
