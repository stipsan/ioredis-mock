'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zscan = zscan;

var _scanCommand = require('../commands-utils/scan-command.common');

function zscan(key, cursor) {
  if (!this.data.has(key)) {
    return [0, []];
  }
  var zKeys = [];
  this.data.get(key).forEach(function(_, mkey) {
    return zKeys.push(mkey);
  });

  for (
    var _len = arguments.length,
      args = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    args[_key - 2] = arguments[_key];
  }

  return _scanCommand.scanHelper.apply(
    undefined,
    [zKeys, 1, cursor].concat(args)
  );
}
