'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getrange = getrange;
function getrange(key, s, e) {
  var val = this.data.get(key);
  var start = parseInt(s, 10);
  var end = parseInt(e, 10);

  if (end === -1) {
    return val.slice(start);
  }

  return val.slice(start, end + 1);
}
