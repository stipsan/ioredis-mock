'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.rpush = rpush;
function rpush(key) {
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

  var length = list.push.apply(list, values);
  this.data.set(key, list);
  return length;
}
