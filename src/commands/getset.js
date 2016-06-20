export function getset(key, val) {
  const old = this.data.hasOwnProperty(key) ? this.data[key] : '';
  this.data[key] = val;
  return old;
}
