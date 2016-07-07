export function getset(key, val) {
  const old = {}.hasOwnProperty.call(this.data, key) ? this.data[key] : '';
  this.data[key] = val;
  return old;
}
