'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expire = expire;
function expire(key, seconds) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, seconds * 1000 + Date.now());

  return 1;
}
