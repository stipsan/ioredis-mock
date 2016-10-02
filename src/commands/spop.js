import { random } from 'lodash';

export function spop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a set`);
  }

  const list = this.data.get(key) || [];
  const total = list.length;

  if (total === 0) {
    return null;
  }

  const shouldReturnArray = count !== undefined;
  const max = shouldReturnArray ? count : 1;

  if (total <= max) {
    this.data.set(key, []);
    return list;
  }

  const items = [];
  let results = 0;
  while (results < max) {
    const item = list.splice(random(0, list.length - 1), 1);

    results += 1;
    items.push(item);
  }

  return shouldReturnArray ? items : items[0];
}
