import Map from 'es6-map';
import arrayFrom from 'array-from';
import { flatMap, orderBy, forEach, reverse } from 'lodash';
import { slice } from './zrange-command.common';

export function zpopmax(key, count = 1) {
  const map = this.data.get(key);

  if (map == null || !(map instanceof Map)) {
    return [];
  }

  const ordered = reverse(
    slice(orderBy(arrayFrom(map.values()), ['score', 'value']), -count, -1)
  );

  forEach(ordered, (it) => {
    map.delete(it.value);
  });
  this.data.set(key, map);

  return flatMap(ordered, (it) => [it.value, it.score]);
}
