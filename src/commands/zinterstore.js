import Map from 'es6-map';
import arrayFrom from 'array-from';
import { intersectionBy } from 'lodash';

export function zinterstore(destKey, numKeys, ...keys) {
  const srcMaps = [];

  if (parseInt(numKeys, 10) !== keys.length) {
    throw new Error('ERR syntax error');
  }

  for (let i = 0; i < keys.length; i += 1) {
    // @TODO investigate a more stable way to detect sorted lists
    if (!this.data.has(keys[i]) || !(this.data.get(keys[i]) instanceof Map)) {
      return 0;
    }
    srcMaps.push(this.data.get(keys[i]));
  }

  // deep copy inputs
  const inputs = srcMaps.map((x) =>
    JSON.parse(JSON.stringify(arrayFrom(x.values())))
  );

  const intersected = intersectionBy(...inputs, 'value');

  if (intersected.length === 0) {
    // make sure we don't have destKey set anymore
    this.data.delete(destKey);

    return 0;
  }

  // @TODO: support AGGREGATE option
  // @TODO: support WEIGHTS option
  // aggregate weights
  for (let i = 0; i < intersected.length; i += 1) {
    let weightSum = 0;

    for (let j = 0; j < srcMaps.length; j += 1) {
      if (srcMaps[j].get(intersected[i].value)) {
        weightSum += srcMaps[j].get(intersected[i].value).score;
      }
    }

    intersected[i].score = weightSum;
    intersected[i] = [intersected[i].value, intersected[i]];
  }

  const intersectedMap = new Map(intersected);

  // store new sorted set
  this.data.set(destKey, intersectedMap);

  return intersected.length;
}
