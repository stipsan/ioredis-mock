import Map from 'es6-map';
import utils from 'ioredis/lib/utils';

export function hmset(key, ...args) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  let hmsetData = [];
  if (args.length === 1) {
    if (args[0] instanceof Map) {
      hmsetData = utils.convertMapToArray(args[0]);
    } else if (typeof args[0] === 'object' && args[0] !== null) {
      hmsetData = utils.convertObjectToArray(args[0]);
    }
  } else {
    hmsetData = args;
  }

  const hash = this.data.get(key);
  for (let i = 0; i < hmsetData.length; i += 2) {
    hash[hmsetData[i]] = hmsetData[i + 1];
  }

  this.data.set(key, hash);

  return 'OK';
}
