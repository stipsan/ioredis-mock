require('babel-register');
const path = require('path');
const fs = require('fs');
const commands = require('redis-commands');
const redis = require('ioredis');
const RedisMock = require('../src').default;

const mockedRedis = new RedisMock();

let tableMd = `
### Supported commands
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`;
commands.list.forEach((command) => {
  const redisCol = `[${command}](http://redis.io/commands/${command.toUpperCase()})`;
  const ioredisCol = command in redis.prototype ? ':white_check_mark:' : ':x:';
  const ioredisMockCol = command in mockedRedis ? ':white_check_mark:' : ':x:';
  tableMd += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`;
});

fs.writeFile(path.resolve(__dirname, '..', 'compat.md'), tableMd, (err) => {
  if (err) throw err;
});
