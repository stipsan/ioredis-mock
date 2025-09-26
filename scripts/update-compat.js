require('@babel/register')
const path = require('path')
const fs = require('fs')
const redis = require('ioredis')
const { list } = require('../data/command-list.json')
const RedisMock = require('../src')

const mockedRedis = new RedisMock()

const skipList = {
  'restore-asking': false,
  debug: 'This command is intended to aid in debugging redis',
  dump: "Doesn't make sense to implement the internal data format used by RDB",
  exec: false,
  hello:
    "The protocols this command is switching between (RESP2, RESP3, Redis 6) aren't in use",
  latency:
    "ioredis-mock isn't operating over the network so there is no latency to monitor",
  memory: "It's unlikely this can be emulated in a JS environment",
  migrate:
    "This command actually executes a DUMP + DEL on the source instance, and a RESTORE in the target. Since DUMP and RESTORE won't be implemented it includes MIGRATE.",
  module: "It's unlikely that we'll be able to run Redis Modules in a JS VM",
  multi: false,
  pfdebug: 'This command is intended to aid in debugging redis',
  pfselftest: false,
  restore:
    'The RDB specific format used for restores would be a massive undertaking to implement with very little gain.',
  slowlog: "Useful when you're on redis, not so much when on ioredis-mock",
}
for (const key of Object.keys(skipList)) {
  if (list.indexOf(key) === -1) {
    throw new Error(`Remove ${key} from skipList`)
  }
}
const commandsList = list.filter(
  command => !(command in skipList) && !command.includes('|')
)
// Sort by ioredis support status first (supported commands first), then alphabetically
commandsList.sort((a, b) => {
  const aSupported = a in redis.prototype
  const bSupported = b in redis.prototype

  // If one is supported by ioredis and the other is not, prioritize the supported one
  if (aSupported && !bSupported) return -1
  if (!aSupported && bSupported) return 1

  // If both have the same ioredis support status, sort alphabetically
  return a.localeCompare(b)
})
const mockCommands = Object.keys(mockedRedis)
let footerLinks = '[1]: https://github.com/luin/ioredis#handle-binary-data'
let supportedCommands = 0
let ioredisCommandsCount = 0 // Track ioredis-supported commands for coverage calculation
let missingBufferCommands = ''
let tableRows = `
| redis | ioredis | ioredis-mock |
|-------|:-------:|:------------:|`
commandsList.forEach(command => {
  footerLinks += `
  [${command}]: http://redis.io/commands/${command.toUpperCase()}`
  const redisCol = `[${command}]`
  const ioredisSupported = command in redis.prototype
  const ioredisCol = ioredisSupported ? ':white_check_mark:' : ':x:'
  const supportedCommand = mockCommands.includes(command)
  const ioredisMockCol = supportedCommand ? ':white_check_mark:' : ':x:'

  // Only count commands supported by ioredis for coverage calculation
  if (ioredisSupported) {
    ioredisCommandsCount += 1
    if (supportedCommand) {
      supportedCommands += 1
    }
  }

  tableRows += `
|${redisCol}|${ioredisCol}|${ioredisMockCol}|`

  const commandBuffer = `${command}Buffer`
  const ioredisSupportsBuffer = commandBuffer in redis.prototype
  const supportedCommandBuffer = mockCommands.includes(commandBuffer)

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

const percentage = Math.floor((supportedCommands / ioredisCommandsCount) * 100)

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

if (missingBufferCommands.length) {
  missingBufferCommands = `

## Missing buffer commands

${missingBufferCommands}`
}

const tableMd = `## Supported commands ![Commands Coverage: ${percentage}%](https://img.shields.io/badge/coverage-${percentage}%25-${color}.svg)
> PRs welcome :heart:
${tableRows}

${missingBufferCommands}

## Commands that won't be implemented
> This is just the current status, and may change in the future. If you have ideas on how to implement any of them feel free to tell us about it.
${skipTableRows}

${footerLinks}`

fs.writeFile(
  path.resolve(__dirname, '..', 'compat.md'),
  tableMd,
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
