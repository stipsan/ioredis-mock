const MAX_OFFSET = 2 ** 32 - 1

// Parse type specification (e.g., 'i8', 'u16', 'i32')
function parseTypeSpec(typeSpec) {
  const match = typeSpec.match(/^([iu])(\d+)$/)
  if (!match) {
    throw new Error('ERR Invalid bitfield type. Use something like i16 u8. Note that u64 is not supported but i64 is.')
  }
  
  const [, signedness, bits] = match
  const bitWidth = parseInt(bits, 10)
  
  if (bitWidth < 1 || bitWidth > 64) {
    throw new Error('ERR Invalid bitfield type. Use something like i16 u8. Note that u64 is not supported but i64 is.')
  }
  
  if (signedness === 'u' && bitWidth === 64) {
    throw new Error('ERR Invalid bitfield type. Use something like i16 u8. Note that u64 is not supported but i64 is.')
  }
  
  return {
    signed: signedness === 'i',
    bitWidth,
  }
}

// Get bit field value at offset
function getBitField(buffer, offset, bitWidth, signed) {
  if (offset > MAX_OFFSET) {
    throw new Error('ERR bit offset is not an integer or out of range')
  }
  
  const byteOffset = Math.floor(offset / 8)
  const bitOffset = offset % 8
  
  // If offset is beyond buffer, return 0
  if (byteOffset >= buffer.length && bitOffset + bitWidth > (buffer.length * 8 - byteOffset * 8)) {
    return 0
  }
  
  let value = 0
  let bitsRead = 0
  
  // Read bits across potentially multiple bytes
  for (let i = 0; i < Math.ceil(bitWidth / 8); i++) {
    const currentByteOffset = byteOffset + i
    if (currentByteOffset >= buffer.length) break
    
    const byte = buffer[currentByteOffset]
    const startBit = i === 0 ? bitOffset : 0
    const endBit = Math.min(8, startBit + (bitWidth - bitsRead))
    const bitsInThisByte = endBit - startBit
    
    // Extract bits from this byte
    /* eslint-disable no-bitwise */
    const mask = (1 << bitsInThisByte) - 1
    const extractedBits = (byte >> (8 - endBit)) & mask
    
    value = (value << bitsInThisByte) | extractedBits
    /* eslint-enable no-bitwise */
    bitsRead += bitsInThisByte
    
    if (bitsRead >= bitWidth) break
  }
  
  // Handle signed values
  if (signed && bitWidth < 64) {
    /* eslint-disable no-bitwise */
    const signBit = 1 << (bitWidth - 1)
    if (value & signBit) {
      value -= (1 << bitWidth)
    }
    /* eslint-enable no-bitwise */
  }
  
  return value
}

// Set bit field value at offset
function setBitField(inputBuffer, offset, bitWidth, value, signed) {
  if (offset > MAX_OFFSET) {
    throw new Error('ERR bit offset is not an integer or out of range')
  }
  
  const byteOffset = Math.floor(offset / 8)
  const bitOffset = offset % 8
  const totalBitsNeeded = Math.ceil((offset + bitWidth) / 8) * 8
  const bytesNeeded = Math.ceil(totalBitsNeeded / 8)
  
  // Extend buffer if necessary
  let buffer = inputBuffer
  if (buffer.length < bytesNeeded) {
    const newBuffer = Buffer.alloc(bytesNeeded)
    buffer.copy(newBuffer)
    buffer = newBuffer
  }
  
  // Normalize value to fit in bitWidth
  let normalizedValue = value
  if (signed) {
    /* eslint-disable no-bitwise */
    const minValue = -(1 << (bitWidth - 1))
    const maxValue = (1 << (bitWidth - 1)) - 1
    /* eslint-enable no-bitwise */
    if (normalizedValue < minValue || normalizedValue > maxValue) {
      normalizedValue = value < 0 ? minValue : maxValue
    }
  } else {
    /* eslint-disable no-bitwise */
    const maxValue = (1 << bitWidth) - 1
    normalizedValue &= maxValue
    /* eslint-enable no-bitwise */
  }
  
  // Convert negative values for bit operations
  if (normalizedValue < 0) {
    /* eslint-disable no-bitwise */
    normalizedValue = (1 << bitWidth) + normalizedValue
    /* eslint-enable no-bitwise */
  }
  
  let bitsWritten = 0
  
  // Write bits across potentially multiple bytes
  for (let i = 0; i < Math.ceil(bitWidth / 8); i++) {
    const currentByteOffset = byteOffset + i
    if (currentByteOffset >= buffer.length) break
    
    const startBit = i === 0 ? bitOffset : 0
    const endBit = Math.min(8, startBit + (bitWidth - bitsWritten))
    const bitsInThisByte = endBit - startBit
    
    // Extract the bits we need to write for this byte
    const remainingBits = bitWidth - bitsWritten
    const bitsToWrite = Math.min(remainingBits, bitsInThisByte)
    const valueShift = Math.max(0, remainingBits - bitsInThisByte)
    /* eslint-disable no-bitwise */
    const bitsFromValue = (normalizedValue >> valueShift) & ((1 << bitsToWrite) - 1)
    
    // Create mask for the bits we're changing
    const mask = ((1 << bitsToWrite) - 1) << (8 - endBit)
    
    // Clear the target bits and set new value
    buffer[currentByteOffset] = (buffer[currentByteOffset] & ~mask) | (bitsFromValue << (8 - endBit))
    /* eslint-enable no-bitwise */
    
    bitsWritten += bitsToWrite
    if (bitsWritten >= bitWidth) break
  }
  
  return buffer
}

export function bitfield(key, ...args) {
  if (args.length < 1) {
    throw new Error('ERR wrong number of arguments for \'bitfield\' command')
  }
  
  // Get current value or create empty buffer
  let currentValue = this.data.get(key) || ''
  let buffer
  
  if (Buffer.isBuffer(currentValue)) {
    buffer = Buffer.from(currentValue)
  } else {
    buffer = Buffer.from(currentValue, 'binary')
  }
  
  const results = []
  let overflowType = 'WRAP' // Default overflow behavior
  let i = 0
  
  while (i < args.length) {
    const operation = args[i].toString().toLowerCase()
    
    switch (operation) {
      case 'get': {
        if (i + 2 >= args.length) {
          throw new Error('ERR wrong number of arguments for BITFIELD GET')
        }
        
        const type = parseTypeSpec(args[i + 1])
        const offset = parseInt(args[i + 2], 10)
        
        if (Number.isNaN(offset)) {
          throw new Error('ERR bit offset is not an integer or out of range')
        }
        
        const value = getBitField(buffer, offset, type.bitWidth, type.signed)
        results.push(value)
        i += 3
        break
      }
      
      case 'set': {
        if (i + 3 >= args.length) {
          throw new Error('ERR wrong number of arguments for BITFIELD SET')
        }
        
        const type = parseTypeSpec(args[i + 1])
        const offset = parseInt(args[i + 2], 10)
        const value = parseInt(args[i + 3], 10)
        
        if (Number.isNaN(offset) || Number.isNaN(value)) {
          throw new Error('ERR bit offset is not an integer or out of range')
        }
        
        // Get previous value
        const oldValue = getBitField(buffer, offset, type.bitWidth, type.signed)
        results.push(oldValue)
        
        // Set new value
        buffer = setBitField(buffer, offset, type.bitWidth, value, type.signed)
        i += 4
        break
      }
      
      case 'incrby': {
        if (i + 3 >= args.length) {
          throw new Error('ERR wrong number of arguments for BITFIELD INCRBY')
        }
        
        const type = parseTypeSpec(args[i + 1])
        const offset = parseInt(args[i + 2], 10)
        const increment = parseInt(args[i + 3], 10)
        
        if (Number.isNaN(offset) || Number.isNaN(increment)) {
          throw new Error('ERR bit offset is not an integer or out of range')
        }
        
        const currentVal = getBitField(buffer, offset, type.bitWidth, type.signed)
        let newValue = currentVal + increment
        
        // Handle overflow
        if (type.signed) {
          /* eslint-disable no-bitwise */
          const minValue = -(1 << (type.bitWidth - 1))
          const maxValue = (1 << (type.bitWidth - 1)) - 1
          /* eslint-enable no-bitwise */
          
          if (overflowType === 'FAIL' && (newValue < minValue || newValue > maxValue)) {
            results.push(null)
            i += 4
            break
          } else if (overflowType === 'SAT') {
            newValue = Math.max(minValue, Math.min(maxValue, newValue))
          } else { // WRAP
            /* eslint-disable no-bitwise */
            while (newValue < minValue) newValue += (1 << type.bitWidth)
            while (newValue > maxValue) newValue -= (1 << type.bitWidth)
            /* eslint-enable no-bitwise */
          }
        } else {
          /* eslint-disable no-bitwise */
          const maxValue = (1 << type.bitWidth) - 1
          /* eslint-enable no-bitwise */
          
          if (overflowType === 'FAIL' && (newValue < 0 || newValue > maxValue)) {
            results.push(null)
            i += 4
            break
          } else if (overflowType === 'SAT') {
            newValue = Math.max(0, Math.min(maxValue, newValue))
          } else { // WRAP
            /* eslint-disable no-bitwise */
            newValue &= maxValue
            /* eslint-enable no-bitwise */
          }
        }
        
        buffer = setBitField(buffer, offset, type.bitWidth, newValue, type.signed)
        results.push(newValue)
        i += 4
        break
      }
      
      case 'overflow': {
        if (i + 1 >= args.length) {
          throw new Error('ERR wrong number of arguments for BITFIELD OVERFLOW')
        }
        
        const type = args[i + 1].toString().toLowerCase()
        if (!['wrap', 'sat', 'fail'].includes(type)) {
          throw new Error('ERR Invalid OVERFLOW type specified')
        }
        
        overflowType = type.toUpperCase()
        i += 2
        break
      }
      
      default:
        throw new Error(`ERR Unknown BITFIELD operation '${operation}'`)
    }
  }
  
  // Save the modified buffer back to storage
  if (buffer.length > 0) {
    this.data.set(key, buffer)
  }
  
  return results
}

export const bitfieldBuffer = bitfield