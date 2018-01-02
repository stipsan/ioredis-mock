import Map from 'es6-map';
import arrayFrom from 'array-from';
import { orderBy, filter } from 'lodash';

function parseLimit(input) {
  let str = `${input}`;
  let strict = false;
  if (str[0] === '(') {
    str = str.substr(1, str.length);
    strict = true;
  } else if (str === '-inf') {
    return { value: -Infinity, isStrict: true };
  } else if (str === '+inf') {
    return { value: +Infinity, isStrict: true };
  }

  return {
    value: parseInt(str, 10),
    isStrict: strict,
  };
}

export function zrangebyscore(key, inputMin, inputMax) {
  const map = this.data.get(key);
  if (!map) {
    return [];
  }

  // @TODO investigate a more stable way to detect sorted lists
  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return [];
  }

  const min = parseLimit(inputMin);
  const max = parseLimit(inputMax);

  const filteredArray = filter(arrayFrom(map.values()), it => {
    if (it.score < min.value || (min.isStrict && it.score === min.value)) {
      return false;
    }

    if (it.score > max.value || (max.isStrict && it.score === max.value)) {
      return false;
    }

    return true;
  });

  return orderBy(filteredArray, 'score').map(it => it.value);
}
