export function llen(key) {
  if (this.data[key] && !(this.data[key] instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  return (this.data[key] || []).length;
}
