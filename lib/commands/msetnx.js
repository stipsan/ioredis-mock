'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.msetnx = msetnx;

var _index = require('./index');

function msetnx() {
  for (var i = 0; i < arguments.length; i += 2) {
    if (this.data.has(arguments.length <= i ? undefined : arguments[i])) {
      return 0;
    }
  }

  for (var _i = 0; _i < arguments.length; _i += 2) {
    _index.set.call(
      this,
      arguments.length <= _i ? undefined : arguments[_i],
      arguments.length <= _i + 1 ? undefined : arguments[_i + 1]
    );
  }

  return 1;
}
