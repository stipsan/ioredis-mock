/* eslint-disable quotes */
import Redis from 'ioredis';

describe('commands', () => {
  test('Calling unsupported command throws a descriptive error', () => {
    const redis = new Redis();
    expect(() => redis.object()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"object\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/master/compat.md#supported-commands-"`
    );
  });

  test('Calling unsupported buffer command throws a descriptive error', () => {
    const redis = new Redis();
    expect(() => redis.objectBuffer()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"objectBuffer\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/master/compat.md#supported-commands-"`
    );
  });
});
