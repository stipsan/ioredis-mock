import sample from 'lodash.sample';
import shuffle from 'lodash.shuffle';
import take from 'lodash.take';
import toArray from 'lodash.toarray';

const safeCount = (count) => {
  const result = count !== undefined ? parseInt(count, 10) : 1;
  if (Number.isNaN(result) || result < 0) {
    throw new Error('ERR value is not an integer or out of range');
  }
  return result;
};

export function spop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  const want = safeCount(count);
  const set = this.data.get(key) || new Set();
  const total = set.size;

  if (want === 0) return undefined;
  if (total === 0) return null;
  const values = toArray(set);
  let result;
  if (want === 1) {
    result = sample(values);
    set.delete(result);
  } else if (total <= want) {
    result = values;
    set.clear();
  } else {
    result = take(shuffle(values), want);
    result.map((item) => set.delete(item));
  }

  this.data.set(key, set);
  return result;
}
