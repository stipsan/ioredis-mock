'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();

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

var _stream = require('stream');

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

var ReadableScan = (function(_Readable) {
  _inherits(ReadableScan, _Readable);

  function ReadableScan(scanCommand) {
    var opt =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ReadableScan);

    var _this = _possibleConstructorReturn(
      this,
      (ReadableScan.__proto__ || Object.getPrototypeOf(ReadableScan)).call(
        this,
        { objectMode: true }
      )
    );

    _this._scanCommand = scanCommand;
    _this._cursor = 0;
    _this.opt = opt;
    _this._drained = false;
    return _this;
  }

  _createClass(ReadableScan, [
    {
      key: '_callScan',
      value: function _callScan() {
        var args = [this._cursor];
        if (this.opt.key) {
          args.unshift(this.opt.key);
        }
        if (this.opt.match) {
          args.push('MATCH', this.opt.match);
        }
        if (this.opt.count) {
          args.push('COUNT', this.opt.count);
        }
        return this._scanCommand.apply(this, args);
      },
    },
    {
      key: '_read',
      value: function _read() {
        var _this2 = this;

        if (this._drained) {
          this.push(null);
          return;
        }
        this._callScan()
          .then(function(res) {
            var _res = _slicedToArray(res, 2),
              nextCursor = _res[0],
              keys = _res[1];

            if (nextCursor === 0) {
              _this2._drained = true;
            } else {
              _this2._cursor = nextCursor;
            }
            if (keys.length > 0) _this2.push(keys);
            else _this2._read();
          })
          .catch(function(err) {
            return process.nextTick(function() {
              return _this2.emit('error', err);
            });
          });
      },
    },
  ]);

  return ReadableScan;
})(_stream.Readable);

exports.default = ReadableScan;
