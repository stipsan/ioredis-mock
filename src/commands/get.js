export function get(key) {
  return this.data.hasOwnProperty(key) ? this.data[key] : null;
}
