export function getset(key, val) {
  const old = this.data.has(key) ? this.data.get(key) : '';
  this.data.set(key, val);
  return old;
}
