var path = require('path');
var fs = require('fs');
var commands = require('redis-commands');
var redis = require('ioredis');
var redisMock = require('..').default;

var tableMd = `
### Supported commands
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`;
commands.list.forEach(command => {
  var redisCol = `${command}`;
  var ioredisCol = command in redis.prototype ? ':white_check_mark:' : ':x:';
  var ioredisMockCol = command in redisMock.prototype ? ':white_check_mark:' : ':x:';
  tableMd += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`;
});

fs.writeFile(path.resolve('..', 'compat.md'), tableMd, (err) => {
  if (err) throw err;
  console.log('Compat table generated!');
});
