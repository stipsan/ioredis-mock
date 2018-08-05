'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.incr = incr;
function incr(key) {
  if (!this.data.has(key)) {
    this.data.set(key, '0');
  }
  var curVal = Number(this.data.get(key));
  var nextVal = curVal + 1;
  this.data.set(key, nextVal.toString());
  return nextVal;
}
