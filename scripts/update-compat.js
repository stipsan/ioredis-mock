require('babel-register');
const path = require('path');
const fs = require('fs');
const commands = require('redis-commands');
const redis = require('ioredis');
const RedisMock = require('../src');

const mockedRedis = new RedisMock();

const blacklist = [
  'asking',
  'debug',
  'latency',
  'pfdebug',
  'pfselftest',
  'psync',
  'replconf',
  'restore-asking',
  'substr',
  'unlink',
];
const filteredCommands = commands.list.filter(
  command => blacklist.indexOf(command) === -1
);

let supportedCommands = 0;
let tableRows = `
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`;
filteredCommands.forEach(command => {
  const redisCol = `[${command}](http://redis.io/commands/${command.toUpperCase()})`;
  const ioredisCol = command in redis.prototype ? ':white_check_mark:' : ':x:';
  const supportedCommand = command in mockedRedis;
  const ioredisMockCol = supportedCommand ? ':white_check_mark:' : ':x:';
  if (supportedCommand) {
    supportedCommands += 1;
  }
  tableRows += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`;
});

const percentage = Math.floor(
  (supportedCommands / filteredCommands.length) * 100
);

let color = 'red';
if (percentage >= 28) {
  color = 'orange';
}
if (percentage >= 46) {
  color = 'yellow';
}
if (percentage >= 64) {
  color = 'yellowgreen';
}
if (percentage >= 82) {
  color = 'green';
}
if (percentage === 100) {
  color = 'brightgreen';
}

const tableMd = `## Supported commands ![Commands Coverage: ${percentage}%](https://img.shields.io/badge/coverage-${percentage}%25-${color}.svg)
${tableRows}`;

fs.writeFile(
  path.resolve(__dirname, '..', 'compat.md'),
  tableMd,
  'utf8',
  err => {
    if (err) throw err;
  }
);

const readme = path.resolve(__dirname, '..', 'README.md');
fs.readFile(readme, 'utf8', (err, readmeMd) => {
  if (err) throw err;

  fs.writeFile(
    readme,
    readmeMd
      .toString()
      .replace(
        /\[!\[Redis.+\]\(compat\.md\)/g,
        `[![Redis Compatibility: ${percentage}%](https://img.shields.io/badge/redis-${percentage}%25-${color}.svg?style=flat-square)](compat.md)`
      ),
    'utf8',
    err2 => {
      if (err2) throw err2;
    }
  );
});
