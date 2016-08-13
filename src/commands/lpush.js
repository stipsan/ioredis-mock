export function lpush(key, ...values) {
  if (this.data[key] && !(this.data[key] instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const list = this.data[key] || [];
  const length = list.unshift(...values.reverse());
  this.data[key] = list;
  return length;
}
