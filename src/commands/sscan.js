import { scanHelper } from '../commands-utils/scan-command.common';

export function sscan(key, cursor, ...args) {
  if (!this.data.has(key)) {
    return [0, []];
  }
  const setKeys = Array.from(this.data.get(key));
  return scanHelper(setKeys, 1, cursor, ...args);
}
