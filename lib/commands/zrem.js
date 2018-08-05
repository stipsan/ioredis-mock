'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zrem = zrem;
function zrem(key) {
  var map = this.data.get(key);
  if (!map) return 0;

  var removed = 0;

  for (
    var _len = arguments.length,
      vals = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    vals[_key - 1] = arguments[_key];
  }

  vals.forEach(function(val) {
    if (map.delete(val)) {
      removed++;
    }
  });

  this.data.set(key, map);
  return removed;
}
