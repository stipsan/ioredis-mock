export function lrem(key, count, value) {
  if (this.data[key] && !(this.data[key] instanceof Array)) {
    return 0;
  }
  const list = [...this.data[key]] || [];
  const indexFun = (count < 0 ? [].lastIndexOf : [].indexOf).bind(list);
  const max = count === 0 ? list.length : Math.abs(count);
  let removed = 0;
  let idx = indexFun(value);
  while (idx !== -1 && removed < max) {
    removed++;
    list.splice(idx, 1);
    idx = indexFun(value);
  }
  this.data[key] = list;
  return removed;
}
