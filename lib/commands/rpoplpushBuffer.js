'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.rpoplpushBuffer = rpoplpushBuffer;
function rpoplpushBuffer(source, destination) {
  return this.rpoplpush(source, destination);
}
