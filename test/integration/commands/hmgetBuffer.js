import Redis from 'ioredis';

describe('hmgetBuffer', () => {
  it('should return the values as buffers of specified keys in a hash map', () => {
    const redis = new Redis({
      data: {
        'user:1': { id: '1', email: 'bruce@wayne.enterprises' },
      },
    });
    return redis
      .hmgetBuffer('user:1', 'id', 'email', 'location')
      .then((values) => {
        expect(Buffer.isBuffer(values[0])).toBeTruthy();
        expect(Buffer.isBuffer(values[1])).toBeTruthy();
        expect(Buffer.isBuffer(values[2])).toBeFalsy();
        expect(values).toEqual([
          Buffer.from('1'),
          Buffer.from('bruce@wayne.enterprises'),
          null,
        ]);
      });
  });

  it('should return an array of nulls if the hash does not exist', () => {
    const redis = new Redis();
    return redis
      .hmgetBuffer('user:1', 'id', 'email', 'location')
      .then((values) => expect(values).toEqual([null, null, null]));
  });
});
