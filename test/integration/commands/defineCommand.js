import Redis from 'ioredis'

describe('defineCommand', () => {
  describe('setting up a custom command', () => {
    // TODO Skipped because there's a bug in our implementation where it returns raw numbers instead of strings
    ;(process.env.IS_E2E ? it.skip : it)(
      'should call a custom commmand',
      async () => {
        const luaCode = `
        local rcall = redis.call
        local value1 = rcall("GET", KEYS[1])
        local value2 = value1 + ARGV[1]
        rcall("SET", KEYS[1], value2)
      `
        const redis = new Redis()
        const someKey = 'k'
        const initialValue = 1
        const definition = { numberOfKeys: 1, lua: luaCode }

        expect(await redis.set(someKey, initialValue)).toBe('OK')
        await redis.defineCommand('inc2', definition)
        await redis.inc2(someKey, 5)
        expect(await redis.get('k')).toBe(6)
        redis.disconnect()
      }
    )
  })

  it('should support custom commmands returning a table/array', async () => {
    const luaCode = 'return {10, 100, 200}'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([10, 100, 200])
    redis.disconnect()
  })

  it('should return a table/array for hgetall', async () => {
    const luaCode = `
        local rcall = redis.call
        rcall("HSET", KEYS[1], ARGV[1], ARGV[2])
        rcall("HSET", KEYS[1], ARGV[3], ARGV[4])
        return rcall("HGETALL", KEYS[1])
      `
    const redis = new Redis()
    const someKey = 'k'
    const someField1 = 'f1'
    const someField2 = 'f2'
    const someVal1 = 'v1'
    const someVal2 = 'v2'
    const definition = { numberOfKeys: 1, lua: luaCode }

    await redis.defineCommand('someCmd', definition)
    const tableResponse = await redis.someCmd(
      someKey,
      someField1,
      someVal1,
      someField2,
      someVal2
    )
    expect(tableResponse).toEqual([someField1, someVal1, someField2, someVal2])
    redis.disconnect()
  })

  it('should return false for hmget when key is undefined', async () => {
    const luaCode = `
      local reply = redis.call("HMGET", KEYS[1], ARGV[1])
      local value = reply[1]
      if type(value) ~= "boolean" or value ~= false then
        return error("value was not a boolean")
      end
      return reply
    `;
    const definition = { numberOfKeys: 1, lua: luaCode };

    const redis = new Redis()
    redis.defineCommand('someCmd', definition);

    const response = await redis.someCmd('key', 'field');
    expect(response).toStrictEqual([false]);

    redis.disconnect();
  })

  it('should return table/array for hmget when key is defined', async () => {
    const luaCode = `
      redis.call("HMSET", KEYS[1], ARGV[1], "hello, world")
      return redis.call("HMGET", KEYS[1], ARGV[1])
    `;
    const definition = { numberOfKeys: 1, lua: luaCode };

    const redis = new Redis()
    redis.defineCommand('someCmd', definition);

    const response = await redis.someCmd('key', 'field');
    expect(response).toStrictEqual(['hello, world']);

    redis.disconnect();
  })

  it('should support custom commmands returning a table/array of table/array elements', async () => {
    const luaCode = 'return {{10}, {100, 200}, {}}'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([[10], [100, 200], []])
    redis.disconnect()
  })

  // TODO Skipped because there's a bug in our implementation where it returns raw numbers instead of strings
  ;(process.env.IS_E2E ? it.skip : it)(
    'should support custom commands returning a list',
    async () => {
      const redis = new Redis()
      const luaCode = `
      redis.call('lpush', 'key', 3);
      return redis.call('lrange', 'key', 0, -1)
    `
      const definition = { numberOfKeys: 0, lua: luaCode }
      await redis.defineCommand('someCmd', definition)

      expect(await redis.someCmd()).toEqual([3])
      redis.disconnect()
    }
  )

  it('should support custom commands returning an empty list', async () => {
    const luaCode = "return redis.call('lrange', 'nonexistent', 0, -1)"
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([])
    redis.disconnect()
  })

  // TODO Skipped because there's a bug in our implementation where it returns raw numbers instead of strings
  ;(process.env.IS_E2E ? it.skip : it)(
    'should support custom commands returning a table containing a list',
    async () => {
      const luaCode = `
      redis.call('rpush', 'key', 2);
      local contents = redis.call('lrange', 'key', 0, -1);
      local size = redis.call('llen', 'key');
      return { contents, size }
  `
      const redis = new Redis()
      const definition = { numberOfKeys: 0, lua: luaCode }
      await redis.defineCommand('someCmd', definition)

      expect(await redis.someCmd()).toEqual([[2], 1])
      redis.disconnect()
    }
  )

  it('should support custom commands returning ranges', async () => {
    const luaCode = `
      local contents = redis.call('zrange', 'set', 0, -1);
      return contents;
  `
    const redis = new Redis()
    redis.zadd('set', 1, 'value1')
    redis.zadd('set', 2, 'value2')
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual(['value1', 'value2'])
    redis.disconnect()
  })

  it('should maintain one-based indices in lua', async () => {
    const luaCode = `
      local contents = redis.call('zrange', 'set', 0, -1);
      return contents[1];
  `
    const redis = new Redis()
    redis.zadd('set', 1, 'value1')
    redis.zadd('set', 2, 'value2')
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual('value1')
    redis.disconnect()
  })

  it('should support calling custom commmands via multi', async () => {
    const luaCode = 'return 1'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.multi([['someCmd']]).exec()).toEqual([[null, 1]])
    redis.disconnect()
  })

  it('should support calling custom commmands via pipeline', async () => {
    const luaCode = 'return 1'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.pipeline([['someCmd']]).exec()).toEqual([[null, 1]])
    redis.disconnect()
  })
})
