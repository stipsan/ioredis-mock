import { random } from 'lodash';
import Set from 'es6-set';
import arrayFrom from 'array-from';

export function spop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }

  const set = this.data.get(key) || new Set();
  const list = arrayFrom(set);
  const total = set.size;

  if (total === 0) {
    return null;
  }

  const shouldReturnArray = count !== undefined;
  const max = shouldReturnArray ? count : 1;

  if (total <= max) {
    this.data.set(key, new Set());
    return list;
  }

  const items = [];
  let results = 0;
  while (results < max) {
    const item = list.splice(random(0, list.length - 1), 1);

    results += 1;
    items.push(item);
  }
  this.data.set(key, new Set(list));

  return shouldReturnArray ? items : items[0];
}
