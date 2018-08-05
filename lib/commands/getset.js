'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getset = getset;
function getset(key, val) {
  var old = this.data.has(key) ? this.data.get(key) : '';
  this.data.set(key, val);
  this.expires.delete(key);
  return old;
}
