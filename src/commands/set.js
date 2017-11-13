import Map from 'es6-map';
import { expire } from './index';

function createGroupedArray(arr, groupSize) {
  const groups = [];
  for (let i = 0; i < arr.length; i += groupSize) {
    groups.push(arr.slice(i, i + groupSize));
  }
  return groups;
}

export function set(key, value, ...options) {
  const nx = options.indexOf('NX') !== -1;
  const xx = options.indexOf('XX') !== -1;
  const filteredOptions = options.filter(
    option => option !== 'NX' && option !== 'XX'
  );

  if (nx && xx) throw new Error('ERR syntax error');
  if (nx && this.data.has(key)) return null;
  if (xx && !this.data.has(key)) return null;

  this.data.set(key, value);

  const expireOptions = new Map(createGroupedArray(filteredOptions, 2));
  const ttlSeconds =
    expireOptions.get('EX') || expireOptions.get('PX') / 1000.0;

  if (ttlSeconds) {
    expire.call(this, key, ttlSeconds);
  } else {
    this.expires.delete(key);
  }

  return 'OK';
}
