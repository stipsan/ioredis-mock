import { filterPredicate, parseLimit } from './zrange-command.common';

export function zcount(key, inputMin, inputMax) {
  const map = this.data.get(key);
  if (!map) {
    return 0;
  }

  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return 0;
  }

  const min = parseLimit(inputMin);
  const max = parseLimit(inputMax);
  return Array.from(map.values()).filter(filterPredicate(min, max)).length;
}
