import { set } from './index';

export function msetnx(...msetData) {
  for (let i = 0; i < msetData.length; i += 2) {
    if (this.data.has(msetData[i])) {
      return '0';
    }
  }

  for (let i = 0; i < msetData.length; i += 2) {
    set.call(this, msetData[i], msetData[i + 1]);
  }

  return '1';
}
