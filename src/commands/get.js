export function get(key) {
  return {}.hasOwnProperty.call(this.data, key) ? this.data[key] : null;
}
