'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hdel = hdel;
function hdel(key) {
  var value = this.data.get(key);

  for (
    var _len = arguments.length,
      fields = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    fields[_key - 1] = arguments[_key];
  }

  var numDeleted = fields.filter(function(field) {
    if ({}.hasOwnProperty.call(value, field)) {
      delete value[field];
      return true;
    }
    return false;
  }).length;
  this.data.set(key, value);
  return numDeleted;
}
