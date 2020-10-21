import Map from 'es6-map';
import arrayFrom from 'array-from';
import { flatMap, orderBy } from 'lodash';
import { slice } from './zrange-command.common';

export function zrange(key, s, e, withScores) {
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

  const ordered = slice(
    orderBy(arrayFrom(map.values()), ['score', 'value']),
    start,
    end
  );

  if (
    typeof withScores === 'string' &&
    withScores.toUpperCase() === 'WITHSCORES'
  ) {
    return flatMap(ordered, (it) => [it.value, it.score]);
  }

  return ordered.map((it) => it.value);
}
