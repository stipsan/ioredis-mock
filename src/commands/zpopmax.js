import flatMap from 'lodash.flatmap';
import forEach from 'lodash.foreach';
import orderBy from 'lodash.orderby';
import reverse from 'lodash.reverse';

import { slice } from './zrange-command.common';

export function zpopmax(key, count = 1) {
  const map = this.data.get(key);

  if (map == null || !(map instanceof Map)) {
    return [];
  }

  const ordered = reverse(
    slice(orderBy(Array.from(map.values()), ['score', 'value']), -count, -1)
  );

  forEach(ordered, (it) => {
    map.delete(it.value);
  });
  this.data.set(key, map);

  return flatMap(ordered, (it) => [it.value, it.score]);
}
