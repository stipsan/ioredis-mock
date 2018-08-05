'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.incrbyfloat = incrbyfloat;
function incrbyfloat(key, increment) {
  var curVal = parseFloat(this.data.get(key));
  this.data.set(key, (curVal + parseFloat(increment)).toString());
  return this.data.get(key);
}
