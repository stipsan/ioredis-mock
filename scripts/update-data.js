// Exports data from real redis to src/commands-data

const Redis = require('ioredis')
const writeFile = require('write-file-atomic')
const path = require('path')

async function main() {
  const redis = new Redis()
  const dir = path.resolve(__dirname, '..', 'data')
  const results = await Promise.all([
    redis.info(),
    redis.command('info'),
    redis.command('docs'),
    redis.command('list'),
    redis.command('count'),
  ])
  const [info, commandInfo, commandDocs, commandList, commandCount] = results
  await Promise.all(
    [
      [
        'info.json',
        info.replace(
          /executable:.*\/redis-server/,
          'executable:/tmp/redis-server'
        ),
      ],
      ['command-info.json', commandInfo],
      ['command-docs.json', commandDocs],
      ['command-list.json', { list: commandList, count: commandCount }],
    ].map(([file, data]) =>
      writeFile(path.resolve(dir, file), JSON.stringify(data))
    )
  )
}

main()
  .then(process.exit)
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })
