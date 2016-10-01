export function hexists(key, field) {
  return {}.hasOwnProperty.call(this.data.get(key), field) ? '1' : '0';
}
