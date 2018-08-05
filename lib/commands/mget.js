'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mget = mget;
function mget() {
  var _this = this;

  for (
    var _len = arguments.length, keys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    keys[_key] = arguments[_key];
  }

  return keys.map(function(key) {
    return _this.data.has(key) ? _this.data.get(key) : null;
  });
}
