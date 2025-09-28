// BITFIELD_RO is the read-only variant of BITFIELD
// It only supports GET operations and OVERFLOW (though OVERFLOW has no effect on read-only operations)

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

export function bitfieldRo(key, ...args) {
  if (args.length < 1) {
    throw new Error('ERR wrong number of arguments for \'bitfield_ro\' command')
  }
  
  // Get current value or create empty buffer
  const currentValue = this.data.get(key) || ''
  let buffer
  
  if (Buffer.isBuffer(currentValue)) {
    buffer = Buffer.from(currentValue)
  } else {
    buffer = Buffer.from(currentValue, 'binary')
  }
  
  const results = []
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
      
      case 'overflow': {
        if (i + 1 >= args.length) {
          throw new Error('ERR wrong number of arguments for BITFIELD OVERFLOW')
        }
        
        const type = args[i + 1].toString().toLowerCase()
        if (!['wrap', 'sat', 'fail'].includes(type)) {
          throw new Error('ERR Invalid OVERFLOW type specified')
        }
        
        // OVERFLOW has no effect in read-only mode, but we still validate and skip it
        i += 2
        break
      }
      
      case 'set':
      case 'incrby':
        throw new Error('ERR BITFIELD_RO only supports the GET subcommand')
      
      default:
        throw new Error(`ERR Unknown BITFIELD operation '${operation}'`)
    }
  }
  
  return results
}

export const bitfieldRoBuffer = bitfieldRo

// For compatibility with the actual Redis command name
/* eslint-disable camelcase */
export const bitfield_ro = bitfieldRo
export const bitfield_roBuffer = bitfieldRo
/* eslint-enable camelcase */