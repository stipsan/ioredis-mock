require('babel-register');
const path = require('path');
const fs = require('fs');
const commands = require('redis-commands');
const redis = require('ioredis');
const RedisMock = require('../src').default;

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
const filteredCommands = commands.list.filter(command => blacklist.indexOf(command) === -1);

let supportedCommands = 0;
let tableRows = `| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`;
filteredCommands.forEach((command) => {
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

const percentage = Math.floor((supportedCommands / filteredCommands.length) * 100);

let color = 'red';
if (percentage >= 25) {
  color = 'orange';
}
if (percentage >= 55) {
  color = 'yellow';
}
if (percentage >= 70) {
  color = 'yellowgreen';
}
if (percentage >= 85) {
  color = 'green';
}
if (percentage === 100) {
  color = 'brightgreen';
}

const tableMd = `![Commands: ${percentage}%](https://img.shields.io/badge/commands-${percentage}%25-${color}.svg)
${tableRows}`;

fs.writeFile(path.resolve(__dirname, '..', 'compat.md'), tableMd, (err) => {
  if (err) throw err;
});
