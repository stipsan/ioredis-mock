import Map from 'es6-map';
import arrayFrom from 'array-from';
import { orderBy, filter, flatMap } from 'lodash';
import { parseLimit, filterPredicate } from './zrange-command.common';

export function zrevrangebyscore(key, inputMax, inputMin, withScores) {
  const map = this.data.get(key);
  if (!map) {
    return [];
  }

  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return [];
  }

  const min = parseLimit(inputMin);
  const max = parseLimit(inputMax);
  const filteredArray = filter(
    arrayFrom(map.values()),
    filterPredicate(min, max)
  );

  const ordered = orderBy(filteredArray, ['score', 'value'], ['desc', 'desc']);
  if (withScores === 'WITHSCORES') {
    return flatMap(ordered, it => [it.value, it.score]);
  }
  return ordered.map(it => it.value);
}
