'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.incrby = incrby;
function incrby(key) {
  var increment =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var curVal = Number(this.data.get(key));
  var nextVal = curVal + parseInt(increment, 10);
  this.data.set(key, nextVal.toString());
  return nextVal;
}
