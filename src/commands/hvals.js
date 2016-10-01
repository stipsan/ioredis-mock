import { values } from 'lodash';

export function hvals(key) {
  return values(this.data.get(key));
}
