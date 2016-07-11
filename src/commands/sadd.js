export function sadd(key, ...vals) {
  if (!{}.hasOwnProperty.call(this.data, key)) {
    this.data[key] = [];
  }
  this.data[key].push(...vals);
  return vals.length;
}
