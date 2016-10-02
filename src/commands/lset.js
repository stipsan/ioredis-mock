export function lset(key, index, value) {
  if (!this.data.has(key)) {
    throw new Error('no such key');
  }

  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }

  const list = this.data.get(key) || [];
  list[index < 0 ? list.length + index : index] = value;
  return 'OK';
}
