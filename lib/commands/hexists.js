'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hexists = hexists;
function hexists(key, field) {
  var hash = this.data.get(key);
  if (!hash || hash[field] === undefined) {
    return 0;
  }
  return {}.hasOwnProperty.call(hash, field) ? 1 : 0;
}
