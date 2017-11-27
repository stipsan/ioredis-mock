import arrayFrom from 'array-from';

export function sunion(...keys) {
  keys.forEach(key => {
    if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
      throw new Error(`Key ${key} does not contain a set`);
    }
  });

  const sets = keys.map(
    key => (!this.data.has(key) ? this.data.get(key) : new Set())
  );
  const union = new Set(
    sets.reduce((combined, set) => [...combined, ...arrayFrom(set)], [])
  );

  return arrayFrom(union);
}
