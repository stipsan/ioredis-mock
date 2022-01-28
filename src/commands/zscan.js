import { scanHelper } from '../commands-utils/scan-command.common';

export function zscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return ['0', []];
  }
  const zKeys = [];

  this.data.get(key).forEach(({ score, value }) => {
    zKeys.push([value, score.toString()]);
  });

  const [offset, keys] = scanHelper(zKeys, 1, cursor, ...args);
  return [offset, [].concat(...keys)];
}
