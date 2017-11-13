export function hdel(key, ...fields) {
  const value = this.data.get(key);
  const numDeleted = fields.filter(field => {
    if ({}.hasOwnProperty.call(value, field)) {
      delete value[field];
      return true;
    }
    return false;
  }).length;
  this.data.set(key, value);
  return numDeleted;
}
