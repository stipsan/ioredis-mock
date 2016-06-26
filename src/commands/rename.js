export function rename(key, newKey) {
  const value = this.data[key];
  this.data[newKey] = value;
  delete this.data[key];
  return 'OK';
}
