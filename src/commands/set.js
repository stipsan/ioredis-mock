export function set(key, value) {
  this.data.set(key, value);
  this.expires.delete(key);
  return 'OK';
}
