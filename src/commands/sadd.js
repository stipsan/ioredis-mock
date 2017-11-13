import Set from 'es6-set';

export function sadd(key, ...vals) {
  if (!this.data.has(key)) {
    this.data.set(key, new Set());
  }
  let added = 0;
  const set = this.data.get(key);
  vals.forEach(value => {
    if (!set.has(value)) {
      added++;
    }
    set.add(value);
  });
  this.data.set(key, set);
  return added;
}
