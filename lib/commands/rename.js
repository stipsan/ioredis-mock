'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.rename = rename;
function rename(key, newKey) {
  var value = this.data.get(key);

  if (this.expires.has(key)) {
    var expire = this.expires.get(key);
    this.expires.delete(key);
    this.expires.set(newKey, expire);
  }

  this.data.set(newKey, value);
  this.data.delete(key);
  return 'OK';
}
