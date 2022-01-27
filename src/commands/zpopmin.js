import { flatMap, forEach,orderBy } from 'lodash';

import { slice } from './zrange-command.common';

export function zpopmin(key, count = 1) {
  const map = this.data.get(key);

  if (map == null || !(map instanceof Map)) {
    return [];
  }

  const ordered = slice(
    orderBy(Array.from(map.values()), ['score', 'value']),
    0,
    count - 1
  );

  forEach(ordered, (it) => {
    map.delete(it.value);
  });
  this.data.set(key, map);

  return flatMap(ordered, (it) => [it.value, it.score]);
}
