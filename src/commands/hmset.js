export function hmset(key, ...hmsetData) {
  if (!this.data.hasOwnProperty(key)) {
    this.data[key] = {};
  }
  for (let i = 0; i < hmsetData.length; i += 2) {
    this.data[key][hmsetData[i]] = hmsetData[i + 1];
  }

  return 'OK';
}
