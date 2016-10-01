export function getset(key, val) {
  const old = this.data.has(key) ? this.data[key] : '';
  this.data[key] = val;
  return old;
}
