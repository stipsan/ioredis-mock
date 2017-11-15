export function lrange(key, start, end) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  start = parseInt(start, 10);
  end = parseInt(end, 10);
  
  const list = this.data.get(key) || [];
  
  if (start < 0) {
    start = list.length + start;
  }
  if (end < 0) {
    end = list.length + end;
  }

  return list.slice(start, end + 1);
}
