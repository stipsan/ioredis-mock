export function rename(key, newKey) {
  const value = this.data.get(key);
  this.data.set(newKey, value);
  this.data.delete(key);
  return 'OK';
}
