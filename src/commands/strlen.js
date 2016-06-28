export function strlen(key) {
  return this.data.hasOwnProperty(key) ? this.data[key].length : '0';
}
