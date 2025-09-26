// Precomputed popcount lookup table for bytes 0-255
const POPCOUNT_TABLE = new Array(256)
for (let i = 0; i < 256; i++) {
  let count = 0
  let n = i
  /* eslint-disable no-bitwise */
  while (n) {
    count += n & 1
    n >>= 1
  }
  /* eslint-enable no-bitwise */
  POPCOUNT_TABLE[i] = count
}

export function bitcount(key, start, end) {
  if (!this.data.has(key)) return 0

  const value = this.data.get(key)
  let buffer

  // Convert to buffer for binary-safe operation
  if (Buffer.isBuffer(value)) {
    buffer = value
  } else {
    buffer = Buffer.from(value)
  }

  const len = buffer.length

  // No range specified - count all bits
  if (start === undefined && end === undefined) {
    let count = 0
    for (let i = 0; i < len; i++) {
      count += POPCOUNT_TABLE[buffer[i]]
    }
    return count
  }

  // Parse start/end with parseInt base 10, treating invalid as 0
  let startIdx = start !== undefined ? parseInt(start, 10) : 0
  let endIdx = end !== undefined ? parseInt(end, 10) : len - 1

  // Handle NaN by treating as 0 (simplified approach as per requirements)
  if (Number.isNaN(startIdx)) startIdx = 0
  if (Number.isNaN(endIdx)) endIdx = 0

  // Convert negative indices to positive
  if (startIdx < 0) startIdx = len + startIdx
  if (endIdx < 0) endIdx = len + endIdx

  // Apply Redis clamping rules
  if (startIdx < 0) startIdx = 0
  if (endIdx < 0) endIdx = 0
  if (startIdx > endIdx) return 0
  if (startIdx >= len) return 0
  if (endIdx >= len) endIdx = len - 1

  // Count bits in range [startIdx, endIdx] inclusive
  let count = 0
  for (let i = startIdx; i <= endIdx; i++) {
    count += POPCOUNT_TABLE[buffer[i]]
  }

  return count
}

export const bitcountBuffer = bitcount
