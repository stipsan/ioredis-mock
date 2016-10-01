export function hdel(key, ...fields) {
  return fields.filter((field) => {
    if ({}.hasOwnProperty.call(this.data.get(key), field)) {
      delete this.data.get(key)[field];
      return true;
    }
    return false;
  }).length.toString();
}
