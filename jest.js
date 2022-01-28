const util = require('util')

module.exports = util.deprecate(
  require('./lib'),
  `Using the jest.js entrypoint is deprecated: \`jest.mock('ioredis', () => require('ioredis-mock/jest'))\`. You get the same behavior by doing: \`jest.mock('ioredis', () => require('ioredis-mock'))\``
)
