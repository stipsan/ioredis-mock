import  values from 'lodash.values';

export function hvals(key) {
  return values(this.data.get(key));
}
