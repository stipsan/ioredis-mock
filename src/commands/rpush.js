export function rpush(key, ...values) {
  if (this.data[key] && !(this.data[key] instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const list = this.data[key] || [];
  const length = list.push(...values);
  this.data[key] = list;
  return length;
}
