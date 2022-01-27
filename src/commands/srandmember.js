import random from 'lodash.random'
import shuffle from 'lodash.shuffle'

export function srandmember(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }

  const set = this.data.get(key) || new Set();
  const list = Array.from(set);
  const total = list.length;

  if (total === 0) {
    return null;
  }

  const shouldReturnArray = count !== undefined;
  const max = shouldReturnArray ? Math.abs(count) : 1;
  const skipDuplicates = shouldReturnArray && count > -1;

  if (skipDuplicates) {
    return shuffle(list.splice(0, max));
  }

  const items = [];
  let results = 0;
  while (results < max) {
    const item = list[random(0, total - 1)];
    items.push(item);

    results += 1;
  }

  return shouldReturnArray ? items : items[0];
}
