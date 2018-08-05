'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.lpush = lpush;

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

function lpush(key) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error('Key ' + key + ' does not contain a list');
  }
  var list = this.data.get(key) || [];

  for (
    var _len = arguments.length,
      values = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    values[_key - 1] = arguments[_key];
  }

  var length = list.unshift.apply(list, _toConsumableArray(values.reverse()));
  this.data.set(key, list);
  return length;
}
