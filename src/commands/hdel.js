export function hdel(key, ...fields) {
  return fields.filter(field => {
    if ({}.hasOwnProperty.call(this.data[key], field)) {
      delete this.data[key][field];
      return true;
    }
    return false;
  }).length.toString();
}
