module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupRedis.js'],
  // @TODO rewrite these tests to no longer use the `data` constructor option
  testPathIgnorePatterns: [
    'test/integration/cluster.js',
    'test/integration/command-transformers.js',
    'test/integration/commands/auth.js',
    'test/integration/commands/brpoplpush.js',
    'test/integration/commands/brpoplpushBuffer.js',
    'test/integration/commands/connect.js',
    'test/integration/commands/dbsize.js',
    'test/integration/commands/defineCommand.js',
    'test/integration/commands/del.js',
    'test/integration/commands/discard.js',
    'test/integration/commands/echo.js',
    'test/integration/commands/eval.js',
    'test/integration/commands/evalsha.js',
    'test/integration/commands/exists.js',
    'test/integration/commands/expire.js',
    'test/integration/commands/expireat.js',
    'test/integration/commands/flushall.js',
    'test/integration/commands/get.js',
    'test/integration/commands/getbit.js',
    'test/integration/commands/getBuffer.js',
    'test/integration/commands/getset.js',
    'test/integration/commands/hdel.js',
    'test/integration/commands/hexists.js',
    'test/integration/commands/hget.js',
    'test/integration/commands/hgetall.js',
    'test/integration/commands/hgetallBuffer.js',
    'test/integration/commands/hgetBuffer.js',
    'test/integration/commands/hincrby.js',
    'test/integration/commands/hincrbyfloat.js',
    'test/integration/commands/hkeys.js',
    'test/integration/commands/hlen.js',
    'test/integration/commands/hmget.js',
    'test/integration/commands/hmgetBuffer.js',
    'test/integration/commands/hmset.js',
    'test/integration/commands/hscan.js',
    'test/integration/commands/hscanStream.js',
    'test/integration/commands/hset.js',
    'test/integration/commands/hsetnx.js',
    'test/integration/commands/hstrlen.js',
    'test/integration/commands/hvals.js',
    'test/integration/commands/incr.js',
    'test/integration/commands/incrby.js',
    'test/integration/commands/incrbyfloat.js',
    'test/integration/commands/info.js',
    'test/integration/commands/keys.js',
    'test/integration/commands/lastsave.js',
    'test/integration/commands/lindex.js',
    'test/integration/commands/linsert.js',
    'test/integration/commands/llen.js',
    'test/integration/commands/lpop.js',
    'test/integration/commands/lpopBuffer.js',
    'test/integration/commands/lpush.js',
    'test/integration/commands/lpushx.js',
    'test/integration/commands/lrange.js',
    'test/integration/commands/lrem.js',
    'test/integration/commands/lset.js',
    'test/integration/commands/ltrim.js',
    'test/integration/commands/mget.js',
    'test/integration/commands/mset.js',
    'test/integration/commands/msetnx.js',
    'test/integration/commands/persist.js',
    'test/integration/commands/pexpire.js',
    'test/integration/commands/pexpireat.js',
    'test/integration/commands/ping.js',
    'test/integration/commands/psetex.js',
    'test/integration/commands/psubscribe.js',
    'test/integration/commands/pttl.js',
    'test/integration/commands/publish.js',
    'test/integration/commands/randomkey.js',
    'test/integration/commands/rename.js',
    'test/integration/commands/renamenx.js',
    'test/integration/commands/role.js',
    'test/integration/commands/rpop.js',
    'test/integration/commands/rpopBuffer.js',
    'test/integration/commands/rpoplpush.js',
    'test/integration/commands/rpoplpushBuffer.js',
    'test/integration/commands/rpush.js',
    'test/integration/commands/rpushx.js',
    'test/integration/commands/sadd.js',
    'test/integration/commands/save.js',
    'test/integration/commands/scan.js',
    'test/integration/commands/scanStream.js',
    'test/integration/commands/scard.js',
    'test/integration/commands/sdiff.js',
    'test/integration/commands/sdiffstore.js',
    'test/integration/commands/set.js',
    'test/integration/commands/setbit.js',
    'test/integration/commands/setex.js',
    'test/integration/commands/setnx.js',
    'test/integration/commands/sinter.js',
    'test/integration/commands/sinterstore.js',
    'test/integration/commands/sismember.js',
    'test/integration/commands/smembers.js',
    'test/integration/commands/smismember.js',
    'test/integration/commands/smove.js',
    'test/integration/commands/spop.js',
    'test/integration/commands/srandmember.js',
    'test/integration/commands/srem.js',
    'test/integration/commands/sscan.js',
    'test/integration/commands/sscanStream.js',
    'test/integration/commands/strlen.js',
    'test/integration/commands/subscribe.js',
    'test/integration/commands/sunion.js',
    'test/integration/commands/sunionstore.js',
    'test/integration/commands/time.js',
    'test/integration/commands/ttl.js',
    'test/integration/commands/type.js',
    'test/integration/commands/unlink.js',
    'test/integration/commands/xadd.js',
    'test/integration/commands/xlen.js',
    'test/integration/commands/xrange.js',
    'test/integration/commands/xread.js',
    'test/integration/commands/xrevrange.js',
    'test/integration/commands/zcard.js',
    'test/integration/commands/zcount.js',
    'test/integration/commands/zevrank.js',
    'test/integration/commands/zincrby.js',
    'test/integration/commands/zinterstore.js',
    'test/integration/commands/zpopmax.js',
    'test/integration/commands/zpopmin.js',
    'test/integration/commands/zrange.js',
    'test/integration/commands/zrangebyscore.js',
    'test/integration/commands/zrank.js',
    'test/integration/commands/zrem.js',
    'test/integration/commands/zremrangebyrank.js',
    'test/integration/commands/zremrangebyscore.js',
    'test/integration/commands/zrevrange.js',
    'test/integration/commands/zrevrangebyscore.js',
    'test/integration/commands/zrevrank.js',
    'test/integration/commands/zscan.js',
    'test/integration/commands/zscanStream.js',
    'test/integration/commands/zscore.js',
    'test/integration/events.js',
    'test/integration/exec.js',
    'test/integration/keyspace-notifications.js',
    'test/integration/multi.js',
    'test/integration/multiple-mocks.js',
    'test/integration/promises.js',
  ],
}
