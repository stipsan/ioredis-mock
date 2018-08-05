'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.lrem = lrem;

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function lrem(key, c, value) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    return 0;
  }
  var count = parseInt(c, 10);
  var list = [].concat(_toConsumableArray(this.data.get(key) || []));
  var indexFun = (count < 0 ? [].lastIndexOf : [].indexOf).bind(list);
  var max = count === 0 ? list.length : Math.abs(count);
  var removed = 0;
  var idx = indexFun(value);
  while (idx !== -1 && removed < max) {
    removed++;
    list.splice(idx, 1);
    idx = indexFun(value);
  }
  this.data.set(key, list);
  return removed;
}
