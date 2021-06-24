import Redis from 'ioredis';

describe('eval', () => {
  it('should execute a lua script through eval and get the return value', () => {
    const redis = new Redis();
    const NUMBER_OF_KEYS = 2;
    const KEY1 = 'KEY1';
    const KEY2 = 'KEY2';

    return redis
      .set(KEY1, 10)
      .then(() => redis.set(KEY2, 20))
      .then(() => {
        const luaScript = `
            local rcall = redis.call
            local val1 = rcall("GET", KEYS[1])
            local val2 = rcall("GET", KEYS[2])
            local sum = val1 + val2
            return ((val1 + val2) * ARGV[1]) + ARGV[2]
          `;

        return redis
          .eval(luaScript, NUMBER_OF_KEYS, KEY1, KEY2, 100, 5)
          .then((result) => expect(result).toEqual(3005));
      });
  });

  it('should be able to ignore errors from pcall', () => {
    const redis = new Redis();
    const NUMBER_OF_KEYS = 1;
    const KEY1 = 'KEY1';

    return redis.set(KEY1, 10).then(() => {
      const luaScript = `
          local before = redis.pcall('GET', KEYS[1])
          redis.pcall('invalid command')
          return before
        `;

      return redis
        .eval(luaScript, NUMBER_OF_KEYS, KEY1)
        .then((result) => expect(result).toEqual('10'));
    });
  });

  it("repro: # is off-by-one because arrays are 1-based", async () => {
    const redis = new Redis();
    const retVal = await redis.eval(`
      local members = redis.call("SMEMBERS", "nonexistant")
      return #members
    `);
    expect(retVal).toEqual(0)
  })
});
