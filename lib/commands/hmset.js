'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hmset = hmset;
function hmset(key) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  var hash = this.data.get(key);

  for (
    var _len = arguments.length,
      args = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < args.length; i += 2) {
    hash[args[i]] = args[i + 1];
  }

  this.data.set(key, hash);

  return 'OK';
}
