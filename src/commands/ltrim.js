export function ltrim(key, startParam, stopParam) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    return 0;
  }

  const start = parseInt(startParam, 10);
  const stop = parseInt(stopParam, 10);
  const list = [...(this.data.get(key) || [])];

  // Array.prototype.slice uses different stop index than redis
  const stopIndex = stop === -1 ? undefined : stop + 1;
  const updatedList = list.slice(start, stopIndex);
  this.data.set(key, updatedList);
  return 'OK';
}
