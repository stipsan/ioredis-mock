import Map from 'es6-map';
import arrayFrom from 'array-from';
import { orderBy } from 'lodash';
import { slice } from './zrange-command.common';

export function zrevrange(key, s, e) {
  const map = this.data.get(key);
  if (!map) {
    return [];
  }

  // @TODO investigate a more stable way to detect sorted lists
  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return [];
  }

  const start = parseInt(s, 10);
  const end = parseInt(e, 10);

  const val = orderBy(
    arrayFrom(map.values()),
    ['score', 'value'],
    ['desc', 'desc']
  ).map(it => it.value);

  return slice(val, start, end);
}
