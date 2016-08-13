import objectAssign from 'object-assign';

export function hmset(key, ...hmsetData) {
  if (!{}.hasOwnProperty.call(this.data, key)) {
    this.data[key] = {};
  }

  if (hmsetData.length === 1) {
    // assume object
    this.data[key] = objectAssign({}, hmsetData[0]);
  } else {
    // assume array
    for (let i = 0; i < hmsetData.length; i += 2) {
      this.data[key][hmsetData[i]] = hmsetData[i + 1];
    }
  }

  return 'OK';
}
