import Redis from 'ioredis';

afterEach(async () => {
  const redis = new Redis();
  await redis.flushall();
  await redis.disconnect();
});

/*
// https://github.com/luin/ioredis/blob/bf3bec7778d071edfca67120f21cb8f9f8bc83d3/test/helpers/global.ts#L6-L11
afterEach((done) => {
  new Redis()
    .pipeline()
    .flushall()
    .script('flush')
    .client('kill', 'normal')
    .exec(done);
});
// */
