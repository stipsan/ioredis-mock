import Redis from 'ioredis'

// If the test suite failed it might have dirty data that could create false negatives if we don't purge before we start
beforeAll(async () => {
  const redis = new Redis()
  await redis.flushall()
  await redis.disconnect()
})

afterEach(async () => {
  const redis = new Redis()
  await redis.flushall()
  await redis.disconnect()
})

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
