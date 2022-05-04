// Exports data from real redis to data/*.json

const Redis = require('ioredis')
const writeFile = require('write-file-atomic')
const path = require('path')
const sortBy = require('lodash.sortby')

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
      [
        'command-info.json',
        sortBy(commandInfo, ([cmd]) => cmd).map(
          ([_0, _1, _2, _3, _4, _5, _6, _7, _8, subcommands, ...rest]) => [
            _0,
            _1,
            _2,
            _3,
            _4,
            _5,
            _6,
            _7,
            _8,
            subcommands?.length
              ? sortBy(subcommands, ([cmd]) => cmd)
              : subcommands,
            ...rest,
          ]
        ),
      ],
      ['command-docs.json', commandDocs],
      ['command-list.json', { list: sortBy(commandList), count: commandCount }],
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
