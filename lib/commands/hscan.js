'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hscan = hscan;

var _scanCommand = require('../commands-utils/scan-command.common');

function hscan(key, cursor) {
  if (!this.data.has(key)) {
    return [0, []];
  }
  var hKeys = Object.keys(this.data.get(key));

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
    [hKeys, 1, cursor].concat(args)
  );
}
