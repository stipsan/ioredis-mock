import MockRedis from '../../src';
import { init, dispose } from '../../src/lua';

describe('defineCommand', () => {
  let vm;

  beforeEach(() => {
    vm = init();
  });

  afterEach(() => {
    dispose(vm);
  });

  describe('setting up a custom command', () => {
    it('should call a custom commmand', () => {
      const luaCode = `
        local rcall = redis.call
        local value1 = rcall("GET", KEYS[1])
        local value2 = value1 + ARGV[1]
        rcall("SET", KEYS[1], value2)
      `;
      const redis = new MockRedis();
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
    const redis = new MockRedis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis.someCmd().then((val) => expect(val).toEqual([10, 100, 200]));
  });

  it('should support custom commmands returning a table/array of table/array elements', () => {
    const luaCode = 'return {{10}, {100, 200}, {}}';
    const redis = new MockRedis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .someCmd()
      .then((val) => expect(val).toEqual([[10], [100, 200], []]));
  });

  it('should support calling custom commmands via multi', () => {
    const luaCode = 'return 1';
    const redis = new MockRedis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .multi([['someCmd']])
      .exec()
      .then((val) => expect(val).toEqual([[null, 1]]));
  });

  it('should support calling custom commmands via pipeline', () => {
    const luaCode = 'return 1';
    const redis = new MockRedis();
    const definition = { numberOfKeys: 0, lua: luaCode };
    redis.defineCommand('someCmd', definition);
    return redis
      .pipeline([['someCmd']])
      .exec()
      .then((val) => expect(val).toEqual([[null, 1]]));
  });
});
