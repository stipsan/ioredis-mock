// ioredis is a peer dependency so we must include it for the RunKit example to work
require('ioredis/package.json');

var RedisMock = require('ioredis-mock');
var redis = new RedisMock({
  data: {
    user_next: '3',
    emails: {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2'
    },
    'user:1': { id: '1', username: 'superman', email: 'clark@daily.planet' },
    'user:2': { id: '2', username: 'batman', email: 'bruce@wayne.enterprises' }
  }
});

await redis.hmset(
  'user:3',
  new Map([
    ['id', await redis.incr('user_next')],
    ['username', 'wonderwoman'],
    ['email', 'diana@amazon.gr']
  ])
);
await redis.hgetall('user:3');