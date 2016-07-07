export function hexists(key, field) {
  return {}.hasOwnProperty.call(this.data[key], field) ? '1' : '0';
}
