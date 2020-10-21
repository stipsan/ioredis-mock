import Map from 'es6-map';
import arrayFrom from 'array-from';
import { orderBy, filter, flatMap } from 'lodash';
import {
  parseLimit,
  filterPredicate,
  getWithScoresAndLimit,
  offsetAndLimit,
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

  let ordered = orderBy(filteredArray, ['score', 'value']);
  if (withScores) {
    if (limit !== null) {
      ordered = offsetAndLimit(ordered, offset, limit);
    }

    return flatMap(ordered, (it) => [it.value, it.score]);
  }

  const results = ordered.map((it) => it.value);
  if (limit !== null) {
    return offsetAndLimit(results, offset, limit);
  }
  return results;
}
