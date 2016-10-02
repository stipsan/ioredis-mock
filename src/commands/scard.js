export function scard(key) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  return (this.data.get(key) || []).length.toString();
}
