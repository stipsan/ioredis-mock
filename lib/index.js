'use strict';

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

var _events = require('events');

var _ioredis = require('ioredis');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

var _commandsStream = require('./commands-stream');

var commandsStream = _interopRequireWildcard(_commandsStream);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _expires = require('./expires');

var _expires2 = _interopRequireDefault(_expires);

var _pipeline = require('./pipeline');

var _pipeline2 = _interopRequireDefault(_pipeline);

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

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var RedisMock = (function(_EventEmitter) {
  _inherits(RedisMock, _EventEmitter);

  function RedisMock() {
    var _ref =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data;

    _classCallCheck(this, RedisMock);

    var _this = _possibleConstructorReturn(
      this,
      (RedisMock.__proto__ || Object.getPrototypeOf(RedisMock)).call(this)
    );

    _this.channels = {};
    _this.batch = undefined;

    _this.expires = (0, _expires2.default)();

    _this.data = (0, _data2.default)(_this.expires, data);

    Object.keys(commands).forEach(function(command) {
      _this[command] = (0, _command2.default)(
        commands[command].bind(_this),
        command,
        _this
      );
    });

    Object.keys(commandsStream).forEach(function(command) {
      _this[command] = commandsStream[command].bind(_this);
    });

    process.nextTick(function() {
      _this.emit('connect');
      _this.emit('ready');
    });
    return _this;
  }

  _createClass(RedisMock, [
    {
      key: 'multi',
      value: function multi() {
        var _this2 = this;

        var batch =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : [];

        this.batch = new _pipeline2.default(this);
        // eslint-disable-next-line no-underscore-dangle
        this.batch._transactions += 1;

        batch.forEach(function(_ref2) {
          var _batch;

          var _ref3 = _toArray(_ref2),
            command = _ref3[0],
            options = _ref3.slice(1);

          return (_batch = _this2.batch)[command].apply(
            _batch,
            _toConsumableArray(options)
          );
        });

        return this.batch;
      },
    },
    {
      key: 'pipeline',
      value: function pipeline() {
        var _this3 = this;

        var batch =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : [];

        this.batch = new _pipeline2.default(this);

        batch.forEach(function(_ref4) {
          var _batch2;

          var _ref5 = _toArray(_ref4),
            command = _ref5[0],
            options = _ref5.slice(1);

          return (_batch2 = _this3.batch)[command].apply(
            _batch2,
            _toConsumableArray(options)
          );
        });

        return this.batch;
      },
    },
    {
      key: 'exec',
      value: function exec(callback) {
        if (!this.batch) {
          return _bluebird2.default.reject(new Error('ERR EXEC without MULTI'));
        }
        var pipeline = this.batch;
        this.batch = undefined;
        return pipeline.exec(callback);
      },
    },
  ]);

  return RedisMock;
})(_events.EventEmitter);

RedisMock.prototype.Command = {
  // eslint-disable-next-line no-underscore-dangle
  transformers: _ioredis.Command._transformer,
  setArgumentTransformer: function setArgumentTransformer(name, func) {
    RedisMock.prototype.Command.transformers.argument[name] = func;
  },

  setReplyTransformer: function setReplyTransformer(name, func) {
    RedisMock.prototype.Command.transformers.reply[name] = func;
  },
};

module.exports = RedisMock;
