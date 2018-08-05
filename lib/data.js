'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };

exports.default = createData;

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _lodash = require('lodash');

var _buffer = require('./buffer');

var _buffer2 = _interopRequireDefault(_buffer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createData(expires) {
  var initial =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var raw = {};
  var data = Object.freeze({
    clear: function clear() {
      raw = {};
    },
    delete: function _delete(key) {
      if (expires.has(key)) {
        expires.delete(key);
      }

      delete raw[key];
    },
    get: function get(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      var value = raw[key];

      if (Array.isArray(value)) {
        return value.slice();
      }

      if (Buffer.isBuffer(value)) {
        return (0, _buffer2.default)(value);
      }

      if (value instanceof _es6Set2.default) {
        return new _es6Set2.default(value);
      }

      if (value instanceof _es6Map2.default) {
        return new _es6Map2.default(value);
      }

      if (
        (typeof value === 'undefined' ? 'undefined' : _typeof(value)) ===
          'object' &&
        value
      ) {
        return (0, _lodash.assign)({}, value);
      }

      return value;
    },
    has: function has(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      return {}.hasOwnProperty.call(raw, key);
    },
    keys: function keys() {
      return Object.keys(raw);
    },
    set: function set(key, val) {
      var item = val;

      if (Array.isArray(val)) {
        item = val.slice();
      } else if (Buffer.isBuffer(val)) {
        item = (0, _buffer2.default)(val);
      } else if (val instanceof _es6Set2.default) {
        item = new _es6Set2.default(val);
      } else if (val instanceof _es6Map2.default) {
        item = new _es6Map2.default(val);
      } else if (
        (typeof val === 'undefined' ? 'undefined' : _typeof(val)) ===
          'object' &&
        val
      ) {
        item = (0, _lodash.assign)({}, val);
      }

      raw[key] = item;
    },
  });

  Object.keys(initial).forEach(function(key) {
    return data.set(key, initial[key]);
  });

  return data;
}
