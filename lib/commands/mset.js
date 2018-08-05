'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mset = mset;

var _index = require('./index');

function mset() {
  for (var i = 0; i < arguments.length; i += 2) {
    _index.set.call(
      this,
      arguments.length <= i ? undefined : arguments[i],
      arguments.length <= i + 1 ? undefined : arguments[i + 1]
    );
  }

  return 'OK';
}
