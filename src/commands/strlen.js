export function strlen(key) {
  return this.data.hasOwnProperty(key) ? this.data[key].length.toString() : '0';
}
