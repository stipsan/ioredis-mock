export function hexists(key, field) {
  return this.data[key].hasOwnProperty(field) ? '1' : '0';
}
