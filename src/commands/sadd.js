export function sadd(key, ...vals) {
  if (!this.data.has(key)) {
    this.data.set(key, []);
  }
  this.data.get(key).push(...vals);
  return vals.length;
}
