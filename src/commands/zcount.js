import Map from 'es6-map';
import arrayFrom from 'array-from';
import { filter } from 'lodash';
import { parseLimit, filterPredicate } from './zrange-command.common';

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
  const filteredArray = filter(
    arrayFrom(map.values()),
    filterPredicate(min, max)
  );

  return filteredArray.length;
}
