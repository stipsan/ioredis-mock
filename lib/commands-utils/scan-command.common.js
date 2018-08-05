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

exports.scanHelper = scanHelper;
function pattern(str) {
  var string = str.replace(/([+{($^|.\\])/g, '\\$1');
  string = string.replace(/(^|[^\\])([*?])/g, '$1.$2');
  string = '^' + string + '$';

  var p = new RegExp(string);
  return p.test.bind(p);
}

function getCountAndMatch(args) {
  if (args.length > 4) {
    throw new Error('Too many arguments');
  }
  if (args.length % 2 !== 0) {
    throw new Error('Args should be provided by pair (name & value)');
  }

  var count = 10;
  var matchPattern = null;
  var test = ('' + args[0] + args[2]).toUpperCase();

  if (test === 'UNDEFINEDUNDEFINED') return [count, matchPattern];
  else if (test === 'MATCHUNDEFINED') matchPattern = pattern(args[1]);
  else if (test === 'COUNTUNDEFINED') count = parseInt(args[1], 10);
  else if (test === 'MATCHCOUNT') {
    matchPattern = pattern(args[1]);
    count = parseInt(args[3], 10);
  } else if (test.startsWith('MATCH') || test.startsWith('COUNT'))
    throw new Error('BAD Syntax');
  else throw new Error('Uknown option ' + args[0]);

  if (Number.isNaN(count)) throw new Error('count must be integer');
  return [count, matchPattern];
}

function scanHelper(allKeys, size, cursorStart) {
  var cursor = parseInt(cursorStart, 10);
  if (Number.isNaN(cursor)) throw new Error('Cursor must be integer');

  for (
    var _len = arguments.length,
      args = Array(_len > 3 ? _len - 3 : 0),
      _key = 3;
    _key < _len;
    _key++
  ) {
    args[_key - 3] = arguments[_key];
  }

  var _getCountAndMatch = getCountAndMatch(args),
    _getCountAndMatch2 = _slicedToArray(_getCountAndMatch, 2),
    count = _getCountAndMatch2[0],
    matchPattern = _getCountAndMatch2[1];

  var nextCursor = cursor + count;
  var keys = allKeys.slice(cursor, nextCursor);

  // Apply MATCH filtering _after_ getting number of keys
  if (matchPattern) {
    var i = 0;
    while (i < keys.length) {
      if (!matchPattern(keys[i])) keys.splice(i, size);
      else i += size;
    }
  }

  // Return 0 when iteration is complete.
  if (nextCursor >= allKeys.length) nextCursor = 0;

  return [nextCursor, keys];
}
