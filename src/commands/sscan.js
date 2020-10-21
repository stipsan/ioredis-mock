import { scanHelper } from '../commands-utils/scan-command.common';

export function sscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return ['0', []];
  }
  const setKeys = [];
  this.data.get(key).forEach((value) => setKeys.push(value));
  return scanHelper(setKeys, 1, cursor, ...args);
}
