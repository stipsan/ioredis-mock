export function strlen(key) {
  return {}.hasOwnProperty.call(this.data, key) ? this.data[key].length.toString() : '0';
}
