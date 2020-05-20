import Map from 'es6-map';
import arrayFrom from 'array-from';
import { orderBy, filter, flatMap } from 'lodash';
import {
  parseLimit,
  filterPredicate,
  getWithScoresAndLimit,
} from './zrange-command.common';

export function zrangebyscore(key, inputMin, inputMax, ...args) {
  const map = this.data.get(key);
  if (!map) {
    return [];
  }

  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return [];
  }

  const { withScores, limit, offset } = getWithScoresAndLimit(args);

  const min = parseLimit(inputMin);
  const max = parseLimit(inputMax);
  const filteredArray = filter(
    arrayFrom(map.values()),
    filterPredicate(min, max)
  );

  const ordered = orderBy(filteredArray, ['score', 'value']);
  if (withScores) {
    const results = flatMap(ordered, it => [it.value, it.score]);

    if (limit) {
      return results.slice(offset * 2, (offset + limit) * 2);
    }
    return results;
  }

  const results = ordered.map(it => it.value);
  if (limit) {
    return results.slice(offset, offset + limit);
  }
  return results;
}
