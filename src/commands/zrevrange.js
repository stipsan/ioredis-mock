import { orderBy, flatten } from 'lodash';
import { slice } from './zrange-command.common';

export function zrevrange(key, s, e, w) {
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

  let val = orderBy(
    Array.from(map.values()),
    ['score', 'value'],
    ['desc', 'desc']
  ).map((it) => {
    if (w) {
      return [it.value, it.score];
    }

    return [it.value];
  });

  val = slice(val, start, end);

  return flatten(val);
}
