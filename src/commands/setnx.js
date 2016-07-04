export function setnx(key, val) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = val;

    return '1';
  }

  return '0';
}
