'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.brpoplpushBuffer = brpoplpushBuffer;
function brpoplpushBuffer(source, destination) {
  return this.brpoplpush(source, destination);
}
