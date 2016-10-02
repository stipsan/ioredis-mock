import { random } from 'lodash';

export function srandmember(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }

  const list = this.data.get(key) || [];
  const total = list.length;

  if (total === 0) {
    return null;
  }

  const shouldReturnArray = count !== undefined;
  const max = shouldReturnArray ? Math.abs(count) : 1;
  const skipDuplicates = shouldReturnArray && count > -1;

  if (total <= max && skipDuplicates) {
    return list;
  }

  const items = [];
  let results = 0;
  while (results < max) {
    const item = list[random(0, total - 1)];

    if (!skipDuplicates || items.indexOf(item) === -1) {
      results += 1;
      items.push(item);
    }
  }

  return shouldReturnArray ? items : items[0];
}
