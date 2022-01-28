import Redis from 'ioredis'

describe('defineCommand', () => {
  describe('setting up a custom command', () => {
    it('should call a custom commmand', async () => {
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
    })
  })

  it('should support custom commmands returning a table/array', async () => {
    const luaCode = 'return {10, 100, 200}'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([10, 100, 200])
    redis.disconnect()
  })

  it('should support custom commmands returning a table/array of table/array elements', async () => {
    const luaCode = 'return {{10}, {100, 200}, {}}'
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([[10], [100, 200], []])
    redis.disconnect()
  })

  it('should support custom commands returning a list', async () => {
    const redis = new Redis()
    const luaCode = `
      redis.call('lpush', 'key', 3);
      return redis.call('lrange', 'key', 0, -1)
    `
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([3])
    redis.disconnect()
  })

  it('should support custom commands returning an empty list', async () => {
    const luaCode = "return redis.call('lrange', 'nonexistent', 0, -1)"
    const redis = new Redis()
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('someCmd', definition)

    expect(await redis.someCmd()).toEqual([])
    redis.disconnect()
  })

  it('should support custom commands returning a table containing a list', async () => {
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
  })

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
