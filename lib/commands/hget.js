'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hget = hget;
function hget(key, hashKey) {
  var hash = this.data.get(key);

  if (!hash || hash[hashKey] === undefined) {
    return null;
  }

  return hash[hashKey];
}
