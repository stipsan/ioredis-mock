export function append(key, value) {
  if (!this.data.has(key)) {
    this.data[key] = '';
  }
  this.data[key] += value;
  return this.data[key].length.toString();
}
