var RedisMock = require('ioredis-mock');
var redis = new RedisMock({
  data: {
    user_next: '3',
    emails: {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2',
    },
    'user:1': { id: '1', username: 'superman', email: 'clark@daily.planet' },
    'user:2': { id: '2', username: 'batman', email: 'bruce@wayne.enterprises' },
  }
});

await redis.incr('user_next');
