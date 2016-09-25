export function mget(keys) {
  return keys.map(key => ({}.hasOwnProperty.call(this.data, key) ? this.data[key] : null));
}
