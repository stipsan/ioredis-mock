import { zrange } from './zrange';

export function zrank(key, member) {
  const vals = zrange.call(this, key, 0, -1);
  const idx = vals.indexOf(member);
  return idx >= 0 ? idx : null;
}
