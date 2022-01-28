require('@babel/register')
const path = require('path')
const fs = require('fs')
const commands = require('redis-commands')
const redis = require('ioredis')
const prettier = require('prettier')
const RedisMock = require('../src')

const mockedRedis = new RedisMock()

const mockCommands = Object.keys(mockedRedis)
let footerLinks = '[1]: https://github.com/luin/ioredis#handle-binary-data'
let bufferSupportedCommands = 0
let supportedCommands = 0
let tableRows = `
| redis | ioredis | ioredis-mock | buffer | ioredis | ioredis-mock |
|-------|:-------:|:------------:|--------|:-------:|:------------:|`
commands.list.forEach(command => {
  footerLinks += `
  [${command}]: http://redis.io/commands/${command.toUpperCase()}`
  const redisCol = `[${command}]`
  const ioredisCol = command in redis.prototype ? ':white_check_mark:' : ':x:'
  const supportedCommand = mockCommands.includes(command)
  const ioredisMockCol = supportedCommand ? ':white_check_mark:' : ':x:'
  if (supportedCommand) {
    supportedCommands += 1
  }
  tableRows += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`

  const commandBuffer = `${command}Buffer`
  const ioredisSupportsBuffer = commandBuffer in redis.prototype
  const ioredisColBuffer = ioredisSupportsBuffer ? ':white_check_mark:' : ':x:'
  const supportedCommandBuffer = mockCommands.includes(commandBuffer)
  const ioredisMockColBuffer = supportedCommandBuffer
    ? ':white_check_mark:'
    : ':x:'
  if (ioredisSupportsBuffer) {
    bufferSupportedCommands += 1
  }
  if (supportedCommandBuffer) {
    supportedCommands += 1
  }
  tableRows += `[${commandBuffer}][1]|${ioredisColBuffer}|${ioredisMockColBuffer}|`
})

const percentage = Math.floor(
  (supportedCommands / (commands.list.length + bufferSupportedCommands)) * 100
)

let color = 'red'
if (percentage >= 28) {
  color = 'orange'
}
if (percentage >= 46) {
  color = 'yellow'
}
if (percentage >= 64) {
  color = 'yellowgreen'
}
if (percentage >= 82) {
  color = 'green'
}
if (percentage === 100) {
  color = 'brightgreen'
}

const tableMd = `## Supported commands ![Commands Coverage: ${percentage}%](https://img.shields.io/badge/coverage-${percentage}%25-${color}.svg)
${tableRows}

${footerLinks}`

fs.writeFile(
  path.resolve(__dirname, '..', 'compat.md'),
  prettier.format(tableMd, { parser: 'markdown' }),
  'utf8',
  err => {
    if (err) throw err
  }
)

const readme = path.resolve(__dirname, '..', 'README.md')
fs.readFile(readme, 'utf8', (err, readmeMd) => {
  if (err) throw err

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
      if (err2) throw err2
    }
  )
})
