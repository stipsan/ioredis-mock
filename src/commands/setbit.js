/* eslint-disable no-bitwise */
const MAX_OFFSET = 2 ** 32 - 1;

export function setbit(key, offset, value) {
  if (offset > MAX_OFFSET)
    throw new Error('ERR bit offset is not an integer or out of range');
  const bit = parseInt(value, 10);
  if (bit !== 0 && bit !== 1)
    throw new Error('ERR bit is not an integer or out of range');

  const byteOffset = parseInt(offset / 8, 10);
  const shift = 7 - (offset % 8); // redis store bit in reverse order (left to right)

  let result = 0;
  let current = '';
  if (this.data.has(key)) {
    current = this.data.get(key);
    result =
      current.length > byteOffset
        ? (current.charCodeAt(byteOffset) >> shift) & 1
        : 0;
  }

  const byteValue = current.charCodeAt(byteOffset) | 0;
  const newCharCode =
    bit === 1 ? byteValue | (1 << shift) : byteValue & ~(1 << shift);
  const padded =
    byteOffset > current.length
      ? current.padEnd(byteOffset - current.length, String.fromCharCode(0))
      : current;
  const newValue =
    padded.substr(0, byteOffset) +
    String.fromCharCode(newCharCode) +
    padded.substr(byteOffset + 1);

  this.data.set(key, newValue);

  return result;
}
