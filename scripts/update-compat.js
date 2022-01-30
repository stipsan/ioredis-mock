require('@babel/register')
const path = require('path')
const fs = require('fs')
const commands = require('redis-commands')
const redis = require('ioredis')
const prettier = require('prettier')
const RedisMock = require('../src')

const mockedRedis = new RedisMock()

const skipList = {
  'host:': false,
  'restore-asking': false,
  debug: 'This command is intended to aid in debugging redis',
  dump: "Doesn't make sense to implement the internal data format used by RDB",
  exec: false,
  hello:
    "THe protocols this command is switching between (RESP2, RESP3, Redis 6) aren't in use",
  latency:
    "ioredis-mock isn't operating over the network so there is no latency to monitor",
  module: "It's unlikely that we'll be able to run Redis Modules in a JS VM",
  multi: false,
  pfselftest: false,
  post: false,
  pselftest: false,
  restore:
    'The RDB specific format used for restores would be a massive undertaking to implement with very little gain.',
  slowlog: "Useful when you're on redis, not so much when on ioredis-mock",
}
const commandsList = commands.list.filter(command => !(command in skipList))
const mockCommands = Object.keys(mockedRedis)
let footerLinks = '[1]: https://github.com/luin/ioredis#handle-binary-data'
let ioredisCommandsWithBuffers = 0
let supportedCommands = 0
let supportedBufferCommands = 0
let missingBufferCommands = ''
let tableRows = `
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`
commandsList.forEach(command => {
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
  const supportedCommandBuffer = mockCommands.includes(commandBuffer)
  if (supportedCommand && ioredisSupportsBuffer) {
    ioredisCommandsWithBuffers += 1
  }
  if (supportedCommand && supportedCommandBuffer) {
    supportedBufferCommands += 1
 
  }
  if (ioredisSupportsBuffer && supportedCommand && !supportedCommandBuffer) {
    // Subtract half a point since we don't consider a command fully implemented if it's missing a buffer version
    supportedCommands -= 0.5
    missingBufferCommands += `
- [${commandBuffer}][1]`
  }
})

let skipTableRows = `
| redis | why it doesn't make sense to emulate |
|:------|:-------------------------------------|`
Object.keys(skipList).forEach(command => {
  if (skipList[command] === false) {
    return
  }
  footerLinks += `
  [${command}]: http://redis.io/commands/${command.toUpperCase()}`
  const redisCol = `[${command}]`

  skipTableRows += `
|${redisCol}|${skipList[command]}|`
})

const percentage = Math.floor((supportedCommands / commandsList.length) * 100)

let color = 'red'
if (percentage >= 60) {
  color = 'orange'
}
if (percentage >= 70) {
  color = 'yellow'
}
if (percentage >= 80) {
  color = 'yellowgreen'
}
if (percentage >= 90) {
  color = 'green'
}
if (percentage === 100) {
  color = 'brightgreen'
}

if(missingBufferCommands.length) {
  missingBufferCommands = `

### Missing buffer commands

${missingBufferCommands}`
}

const tableMd = `## Supported commands ![Commands Coverage: ${percentage}%](https://img.shields.io/badge/coverage-${percentage}%25-${color}.svg)
${tableRows}

${missingBufferCommands}

## Commands that won't be implemented
${skipTableRows}

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
