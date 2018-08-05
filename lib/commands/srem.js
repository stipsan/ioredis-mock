'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.srem = srem;
function srem(key) {
  if (!this.data.has(key)) {
    return 0;
  }

  var removed = 0;
  var set = this.data.get(key);

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
    if (set.has(val)) {
      removed++;
    }
    set.delete(val);
  });

  if (set.size === 0) {
    this.data.delete(key);
  } else {
    this.data.set(key, set);
  }

  return removed;
}
