export function hstrlen(key, field) {
  return (this.data.has(key) && {}.hasOwnProperty.call(this.data.get(key), field)) ?
         this.data.get(key)[field].length.toString() : '0';
}
