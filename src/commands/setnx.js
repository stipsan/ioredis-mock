export function setnx(key, val) {
  if (!this.data.has(key)) {
    this.data.set(key, val);

    return '1';
  }

  return '0';
}
