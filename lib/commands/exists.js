'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.exists = exists;
function exists() {
  var _this = this;

  for (
    var _len = arguments.length, keys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    keys[_key] = arguments[_key];
  }

  return keys.reduce(function(totalExists, key) {
    if (_this.data.has(key)) {
      return totalExists + 1;
    }
    return totalExists;
  }, 0);
}
