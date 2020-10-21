import createBuffer from '../src/buffer';

describe('createBuffer', () => {
  it('should create a buffer from an array', () => {
    const buffer = createBuffer([0x31, 0x32, 0x33]);
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.toString()).toEqual('123');
  });

  it('should create a buffer from a buffer', () => {
    const buffer1 = createBuffer([0x31, 0x32, 0x33]);
    const buffer2 = createBuffer(buffer1);
    expect(buffer1.equals(buffer2)).toBe(true);
  });

  it('should create a buffer from a string', () => {
    const buffer = createBuffer('123');
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.toString()).toEqual('123');
  });
});
