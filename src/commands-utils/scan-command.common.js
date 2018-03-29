function pattern(str) {
  let string = str.replace(/([+{($^|.\\])/g, '\\$1');
  string = string.replace(/(^|[^\\])([*?])/g, '$1.$2');
  string = `^${string}$`;

  const p = new RegExp(string);
  return p.test.bind(p);
}

export function scanHelper(
  allKeys,
  size,
  cursorStart,
  opt1Name,
  opt1val,
  opt2Name,
  opt2val
) {
  const cursor = parseInt(cursorStart, 10);
  if (Number.isNaN(cursor)) throw new Error('Cursor must be integer');

  let count = 10;
  let matchPattern = null;

  const opt1 = (opt1Name || '').toUpperCase();
  const opt2 = (opt2Name || '').toUpperCase();
  if (opt1 === 'MATCH') {
    matchPattern = pattern(opt1val);
    if (opt2 === 'COUNT') count = parseInt(opt2val, 10);
    else if (opt2) {
      throw new Error('BAD Syntax');
    }
  } else if (opt1 === 'COUNT') {
    if (opt2) {
      throw new Error('BAD Syntax');
    }
    count = parseInt(opt1val, 10);
  } else if (opt1) {
    throw new Error(`Uknown option ${opt1}`);
  }

  if (Number.isNaN(count)) throw new Error('count must be integer');

  let nextCursor = cursor + count;
  const keys = allKeys.slice(cursor, nextCursor);

  // Apply MATCH filtering _after_ getting number of keys
  if (matchPattern) {
    let i = 0;
    while (i < keys.length)
      if (!matchPattern(keys[i])) keys.splice(i, size);
      else i += size;
  }

  // Return 0 when iteration is complete.
  if (nextCursor >= allKeys.length) nextCursor = 0;

  return [nextCursor, keys];
}
