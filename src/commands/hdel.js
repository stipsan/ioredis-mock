export function hdel(key, ...fields) {
  return fields.filter(field => {
    if (this.data[key].hasOwnProperty(field)) {
      delete this.data[key][field];
      return true;
    }
    return false;
  }).length.toString();
}
