require('babel-register');
const path = require('path');
const fs = require('fs');
const commands = require('redis-commands');
const redis = require('ioredis');
const redisMock = require('../src').default;

let tableMd = `
### Supported commands
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`;
commands.list.forEach(command => {
  const redisCol = `${command}`;
  const ioredisCol = command in redis.prototype ? ':white_check_mark:' : ':x:';
  const ioredisMockCol = command in redisMock.prototype ? ':white_check_mark:' : ':x:';
  tableMd += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`;
});

fs.writeFile(path.resolve('..', 'compat.md'), tableMd, (err) => {
  if (err) throw err;
});
