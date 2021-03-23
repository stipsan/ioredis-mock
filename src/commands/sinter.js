import { sunion } from './index';

export function sinter(...keys) {
  const values = sunion.apply(this, keys);
  const sets = keys.map((key) =>
    this.data.has(key) ? this.data.get(key) : new Set()
  );

  const intersection = new Set(
    values.filter((value) =>
      sets.reduce(
        (isShared, set) => (set.has(value) ? isShared : false),
        /* isShared */ true
      )
    )
  );

  return Array.from(intersection);
}
