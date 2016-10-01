import objectAssign from 'object-assign';

export function hmset(key, ...hmsetData) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  if (hmsetData.length === 1) {
    // assume object
    this.data.set(key, objectAssign({}, hmsetData[0]));
  } else {
    // assume array
    for (let i = 0; i < hmsetData.length; i += 2) {
      this.data.get(key)[hmsetData[i]] = hmsetData[i + 1];
    }
  }

  return 'OK';
}
