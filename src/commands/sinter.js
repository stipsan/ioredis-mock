import arrayFrom from 'array-from';
import Set from 'es6-set';

import { sunion } from './index';

export function sinter(...keys) {
  const values = sunion.apply(this, keys);
  const sets = keys.map(key => (this.data.has(key) ? this.data.get(key) : new Set()));
  console.log(values);
  const intersection = new Set(values.filter(value => (
    sets.reduce((isShared, set) => (
      set.has(value) ? isShared : false
    ), /* isShared*/ true)
  )));

  return arrayFrom(intersection);
}
