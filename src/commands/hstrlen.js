export function hstrlen(key, field) {
  return (this.data.hasOwnProperty(key) && this.data[key].hasOwnProperty(field)) ?
         this.data[key][field].length.toString() : '0';
}
