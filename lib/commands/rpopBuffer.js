'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.rpopBuffer = rpopBuffer;
function rpopBuffer(key) {
  return this.rpop(key);
}
