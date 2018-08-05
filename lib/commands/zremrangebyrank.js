'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zremrangebyrank = zremrangebyrank;

var _index = require('./index');

function zremrangebyrank(key, s, e) {
  var vals = _index.zrange.call(this, key, s, e);
  var map = this.data.get(key);
  vals.forEach(function(val) {
    map.delete(val);
  });

  this.data.set(key, map);
  return vals.length;
}
