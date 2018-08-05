'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.xadd = xadd;
function xadd(stream, id) {
  for (
    var _len = arguments.length,
      args = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    args[_key - 2] = arguments[_key];
  }

  if (!stream || !id || args.length === 0 || args.length % 2 !== 0) {
    throw new Error("ERR wrong number of arguments for 'xadd' command");
  }
  if (!this.data.has(stream)) {
    this.data.set(stream, []);
  }
  var eventId = (id === '*' ? this.data.get(stream).length + 1 : id) + '-0';
  var list = this.data.get(stream);

  if (list.length > 0 && list[0][0] === '' + eventId) {
    throw new Error(
      'ERR The ID specified in XADD is equal or smaller than the target stream top item'
    );
  }

  this.data.set('stream:' + stream + ':' + eventId, { polled: false });
  this.data.set(stream, list.concat([['' + eventId, [].concat(args)]]));

  return '' + eventId;
}
