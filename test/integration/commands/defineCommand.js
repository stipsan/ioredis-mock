import Redis from 'ioredis';

describe('defineCommand', () => {
  describe('setting up a custom command', () => {
    it('should call a custom commmand', () => {
      const luaCode = `
        local rcall = redis.call
        local value1 = rcall("GET", KEYS[1])
        local value2 = value1 + ARGV[1]
        rcall("SET", KEYS[1], value2)
      `;
      const redis = new Redis();
      const someKey = 'k';
      const initialValue = 1;
      const definition = { numberOfKeys: 1, lua: luaCode };
      return redis
        .set(someKey, initialValue)
        .then((status) => expect(status).toBe('OK'))
        .then(() => {
          redis.defineCommand('inc2', definition);
        })
        .then(() => redis.inc2(someKey, 5))
        .then(() => redis.get('k'))
        .then((newValue) => expect(newValue).toBe(6));
    });
  });

  it('should support custom commmands returning a table/array', () => {
    const luaCode = 'return {10, 100, 200}';
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual([10, 100, 200]));
  });

  it('should support custom commmands returning a table/array of table/array elements', () => {
    const luaCode = 'return {{10}, {100, 200}, {}}';
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .someCmd()
      .then((val) => expect(val).toEqual([[10], [100, 200], []]));
  });

  it('should support custom commands returning a list', () => {
    const redis = new Redis();
    const luaCode = `
      redis.call('lpush', 'key', 3);
      return redis.call('lrange', 'key', 0, -1)
    `;
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual([3]));
  });

  it('should support custom commands returning an empty list', () => {
    const luaCode = "return redis.call('lrange', 'nonexistent', 0, -1)";
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual([]));
  });

  it('should support custom commands returning a table containing a list', () => {
    const luaCode = `
      redis.call('rpush', 'key', 2);
      local contents = redis.call('lrange', 'key', 0, -1);
      local size = redis.call('llen', 'key');
      return { contents, size }
  `;
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual([[2], 1]));
  });

  it('should support custom commands returning ranges', () => {
    const luaCode = `
      local contents = redis.call('zrange', 'set', 0, -1);
      return contents;
  `;
    const redis = new Redis();
    redis.zadd('set', 1, 'value1');
    redis.zadd('set', 2, 'value2');
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .someCmd()
      .then((val) => expect(val).toEqual(['value1', 'value2']));
  });

  it('should maintain one-based indices in lua', () => {
    const luaCode = `
      local contents = redis.call('zrange', 'set', 0, -1);
      return contents[1];
  `;
    const redis = new Redis();
    redis.zadd('set', 1, 'value1');
    redis.zadd('set', 2, 'value2');
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual('value1'));
  });

  it('should support calling custom commmands via multi', () => {
    const luaCode = 'return 1';
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .multi([['someCmd']])
      .exec()
      .then((val) => expect(val).toEqual([[null, 1]]));
  });

  it('should support calling custom commmands via pipeline', () => {
    const luaCode = 'return 1';
    const redis = new Redis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .pipeline([['someCmd']])
      .exec()
      .then((val) => expect(val).toEqual([[null, 1]]));
  });
});
