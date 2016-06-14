export function get(key) {
  return new Promise(resolve => resolve(
    this.data.hasOwnProperty(key) ? this.data[key] : null
  ));
}
