import { scanHelper } from '../commands-utils/scan-command.common';

export function zscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return [0, []];
  }
  const zKeys = [];
  this.data.get(key).forEach((_, mkey) => zKeys.push(mkey));
  return scanHelper(zKeys, 1, cursor, ...args);
}
