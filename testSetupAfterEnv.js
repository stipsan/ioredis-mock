import Redis from 'ioredis';

afterEach((done) => {
  new Redis().flushall().then(() => done());
});
