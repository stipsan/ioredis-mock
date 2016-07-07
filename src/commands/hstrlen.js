export function hstrlen(key, field) {
  return ({}.hasOwnProperty.call(this.data, key) && {}.hasOwnProperty.call(this.data[key], field)) ?
         this.data[key][field].length.toString() : '0';
}
