'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.set = set;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _index = require('./index');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createGroupedArray(arr, groupSize) {
  var groups = [];
  for (var i = 0; i < arr.length; i += groupSize) {
    groups.push(arr.slice(i, i + groupSize));
  }
  return groups;
}

function set(key, value) {
  for (
    var _len = arguments.length,
      options = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    options[_key - 2] = arguments[_key];
  }

  var nx = options.indexOf('NX') !== -1;
  var xx = options.indexOf('XX') !== -1;
  var filteredOptions = options.filter(function(option) {
    return option !== 'NX' && option !== 'XX';
  });

  if (nx && xx) throw new Error('ERR syntax error');
  if (nx && this.data.has(key)) return null;
  if (xx && !this.data.has(key)) return null;

  this.data.set(key, value);

  var expireOptions = new _es6Map2.default(
    createGroupedArray(filteredOptions, 2)
  );
  var ttlSeconds = expireOptions.get('EX') || expireOptions.get('PX') / 1000.0;

  if (ttlSeconds) {
    _index.expire.call(this, key, ttlSeconds);
  } else {
    this.expires.delete(key);
  }

  return 'OK';
}
