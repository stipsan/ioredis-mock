// Exports data from real redis to src/commands-data

const Redis = require('ioredis')

const redis = new Redis()

async function main() {
  console.log(redis)
}

main().then(process.exit).catch(console.error)