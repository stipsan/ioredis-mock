export function getset(key, val) {
  const old = this.data.has(key) ? this.data.get(key) : null;
  this.data.set(key, val);
  this.expires.delete(key);
  return old;
}
