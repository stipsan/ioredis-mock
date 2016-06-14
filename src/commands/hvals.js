import { values } from 'lodash';

export function hvals(key) {
  return new Promise(resolve => {
    resolve(values(this.data[key]));
  });
}
