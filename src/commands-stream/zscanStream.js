import ReadableStream from '../commands-utils/readable-scan';

export function zscanStream(key, opt = {}) {
  const options = opt instanceof Object ? opt : {};
  options.key = key;
  return new ReadableStream(this.zscan, options);
}
