import { orderBy } from 'lodash';
import { slice } from './slice';

export function zrange(key, s, e) {
  const map = this.data.get(key);
  if (!map) {
    return [];
  }

  const start = parseInt(s, 10);
  const end = parseInt(e, 10);

  const val = orderBy(Array.from(map.values()), 'score').map(it => it.value);

  return slice(val, start, end);
}
