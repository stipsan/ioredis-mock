'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

var _command = require('./command');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Pipeline = (function() {
  function Pipeline(redis) {
    var _this = this;

    _classCallCheck(this, Pipeline);

    this.batch = [];
    this.redis = redis;
    this._transactions = 0;

    Object.keys(commands).forEach(function(command) {
      _this[command] = _this._createCommand(command);
    });
  }

  _createClass(Pipeline, [
    {
      key: '_createCommand',
      value: function _createCommand(commandName) {
        var _this2 = this;

        return function() {
          for (
            var _len = arguments.length, args = Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          var commandEmulator = commands[commandName].bind(_this2.redis);
          var commandArgs = (0, _command.processArguments)(
            args,
            commandName,
            _this2.redis
          );
          _this2.batch.push(function() {
            return (0,
            _command.processReply)(commandEmulator.apply(undefined, _toConsumableArray(commandArgs)), commandName, _this2.redis);
          });
          _this2._transactions += 1;
          return _this2;
        };
      },
    },
    {
      key: 'exec',
      value: function exec(callback) {
        // eslint-disable-next-line prefer-destructuring
        var batch = this.batch;
        this.batch = [];
        return _bluebird2.default
          .resolve(
            batch.map(function(cmd) {
              return [null, cmd()];
            })
          )
          .asCallback(callback);
      },
    },
  ]);

  return Pipeline;
})();

exports.default = Pipeline;
