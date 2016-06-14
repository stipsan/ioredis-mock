export function sadd(key, ...vals) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = [];
  }
  this.data[key].push(...vals);
  return vals.length;
}
