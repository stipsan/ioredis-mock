import Redis from 'ioredis';

describe('scan', () => {
  it('should return null array if nothing in db', () => {
    const redis = new Redis();
    return redis.scan(0).then((result) => {
      expect(result[0]).toBe('0');
      expect(result[1]).toEqual([]);
    });
  });

  it('should return keys in db', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
        test: 'bar',
      },
    });

    return redis.scan(0).then((result) => {
      expect(result[0]).toBe('0');
      expect(result[1]).toEqual(['foo', 'test']);
    });
  });
  it('should return fail if incorrect count', () => {
    const redis = new Redis();
    return redis.scan('asdf').catch((result) => {
      expect(result).toBeInstanceOf(Error);
    });
  });
  it('should return fail if incorrect command', () => {
    const redis = new Redis();
    return redis.scan(0, 'ZU').catch((result) => {
      expect(result).toBeInstanceOf(Error);
    });
  });
  it('should return fail if incorrect MATCH usage', () => {
    const redis = new Redis();
    return redis.scan(0, 'MATCH', 'sadf', 'ZU').catch((result) => {
      expect(result).toBeInstanceOf(Error);
    });
  });
  it('should return fail if incorrect COUNT usage', () => {
    const redis = new Redis();
    return redis.scan(0, 'COUNT', 10, 'ZU').catch((result) => {
      expect(result).toBeInstanceOf(Error);
    });
  });
  it('should return fail if incorrect COUNT usage 2', () => {
    const redis = new Redis();
    return redis.scan(0, 'COUNT', 'adsf').catch((result) => {
      expect(result).toBeInstanceOf(Error);
    });
  });
  it('should return only mathced keys', () => {
    const redis = new Redis({
      data: {
        foo0: 'x',
        foo1: 'x',
        foo2: 'x',
        test0: 'x',
        test1: 'x',
      },
    });

    return redis.scan(0, 'MATCH', 'foo*').then((result) => {
      expect(result[0]).toBe('0');
      expect(result[1]).toEqual(['foo0', 'foo1', 'foo2']);
    });
  });
  it('should return only mathced keys and limit by COUNT', () => {
    const redis = new Redis({
      data: {
        foo0: 'x',
        foo1: 'x',
        foo2: 'x',
        test0: 'x',
        test1: 'x',
      },
    });

    return redis
      .scan(0, 'MATCH', 'foo*', 'COUNT', 1)
      .then((result) => {
        expect(result[0]).toBe('1'); // more elements left, this is why cursor is not 0
        expect(result[1]).toEqual(['foo0']);
        return redis.scan(result[0], 'MATCH', 'foo*', 'COUNT', 10);
      })
      .then((result2) => {
        expect(result2[0]).toBe('0');
        expect(result2[1]).toEqual(['foo1', 'foo2']);
      });
  });
  it('should return number of keys set by COUNT and continue by cursor', () => {
    const redis = new Redis({
      data: {
        foo0: 'x',
        foo1: 'x',
        test0: 'x',
        test1: 'x',
      },
    });

    return redis
      .scan(0, 'COUNT', 3)
      .then((result) => {
        expect(result[0]).toBe('3');
        expect(result[1]).toEqual(['foo0', 'foo1', 'test0']);
        return redis.scan(result[0], 'COUNT', 3);
      })
      .then((result2) => {
        expect(result2[0]).toBe('0');
        expect(result2[1]).toEqual(['test1']);
      });
  });
});
