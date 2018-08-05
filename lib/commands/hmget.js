'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hmget = hmget;
function hmget(key) {
  var hash = this.data.get(key);

  for (
    var _len = arguments.length,
      fields = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    fields[_key - 1] = arguments[_key];
  }

  return fields.map(function(field) {
    if (!hash || hash[field] === undefined) {
      return null;
    }
    return hash[field];
  });
}
