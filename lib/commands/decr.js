'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.decr = decr;
function decr(key) {
  var curVal = Number(this.data.get(key));
  var nextVal = curVal - 1;
  this.data.set(key, nextVal.toString());
  return nextVal;
}
