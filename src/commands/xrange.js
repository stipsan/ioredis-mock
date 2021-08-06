export function xrange(stream, start, end, ...args) {
  if (!stream || !start || !end) {
    throw new Error("ERR wrong number of arguments for 'xrange' command");
  }

  const [COUNT, count] = args;

  if (COUNT && !count) {
    throw new Error('ERR syntax error');
  }

  if (!this.data.has(stream)) {
    return [];
  }

  const list = this.data.get(stream);

  const min = start === '-' ? -Infinity : parseInt(start.split('-')[0], 10);
  const max = end === '+' ? Infinity : parseInt(end.split('-')[0], 10);

  const result = list.filter(
    ([eventId]) => min <= parseInt(eventId, 10) && max >= parseInt(eventId, 10)
  );

  if (count) return result.slice(0, count);
  return result;
}
