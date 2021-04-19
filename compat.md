## Supported commands ![Commands Coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

| redis                  |      ioredis       |    ioredis-mock    | buffer                          |      ioredis       |    ioredis-mock    |
| ---------------------- | :----------------: | :----------------: | ------------------------------- | :----------------: | :----------------: |
| [acl]                  | :white_check_mark: | :white_check_mark: | [aclBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [append]               | :white_check_mark: | :white_check_mark: | [appendBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [asking]               | :white_check_mark: | :white_check_mark: | [askingBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [auth]                 | :white_check_mark: | :white_check_mark: | [authBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [bgrewriteaof]         | :white_check_mark: | :white_check_mark: | [bgrewriteaofBuffer][1]         | :white_check_mark: | :white_check_mark: |
| [bgsave]               | :white_check_mark: | :white_check_mark: | [bgsaveBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [bitcount]             | :white_check_mark: | :white_check_mark: | [bitcountBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [bitfield]             | :white_check_mark: | :white_check_mark: | [bitfieldBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [bitfield_ro]          | :white_check_mark: | :white_check_mark: | [bitfield_roBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [bitop]                | :white_check_mark: | :white_check_mark: | [bitopBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [bitpos]               | :white_check_mark: | :white_check_mark: | [bitposBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [blmove]               | :white_check_mark: | :white_check_mark: | [blmoveBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [blpop]                | :white_check_mark: | :white_check_mark: | [blpopBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [brpop]                | :white_check_mark: | :white_check_mark: | [brpopBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [brpoplpush]           | :white_check_mark: | :white_check_mark: | [brpoplpushBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [bzpopmax]             | :white_check_mark: | :white_check_mark: | [bzpopmaxBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [bzpopmin]             | :white_check_mark: | :white_check_mark: | [bzpopminBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [client]               | :white_check_mark: | :white_check_mark: | [clientBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [cluster]              | :white_check_mark: | :white_check_mark: | [clusterBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [command]              | :white_check_mark: | :white_check_mark: | [commandBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [config]               | :white_check_mark: | :white_check_mark: | [configBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [copy]                 | :white_check_mark: | :white_check_mark: | [copyBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [dbsize]               | :white_check_mark: | :white_check_mark: | [dbsizeBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [debug]                | :white_check_mark: | :white_check_mark: | [debugBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [decr]                 | :white_check_mark: | :white_check_mark: | [decrBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [decrby]               | :white_check_mark: | :white_check_mark: | [decrbyBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [del]                  | :white_check_mark: | :white_check_mark: | [delBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [discard]              | :white_check_mark: | :white_check_mark: | [discardBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [dump]                 | :white_check_mark: | :white_check_mark: | [dumpBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [echo]                 | :white_check_mark: | :white_check_mark: | [echoBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [eval]                 | :white_check_mark: | :white_check_mark: | [evalBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [evalsha]              | :white_check_mark: | :white_check_mark: | [evalshaBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [exec]                 | :white_check_mark: | :white_check_mark: | [execBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [exists]               | :white_check_mark: | :white_check_mark: | [existsBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [expire]               | :white_check_mark: | :white_check_mark: | [expireBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [expireat]             | :white_check_mark: | :white_check_mark: | [expireatBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [failover]             | :white_check_mark: | :white_check_mark: | [failoverBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [flushall]             | :white_check_mark: | :white_check_mark: | [flushallBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [flushdb]              | :white_check_mark: | :white_check_mark: | [flushdbBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [geoadd]               | :white_check_mark: | :white_check_mark: | [geoaddBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [geodist]              | :white_check_mark: | :white_check_mark: | [geodistBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [geohash]              | :white_check_mark: | :white_check_mark: | [geohashBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [geopos]               | :white_check_mark: | :white_check_mark: | [geoposBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [georadius]            | :white_check_mark: | :white_check_mark: | [georadiusBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [georadius_ro]         | :white_check_mark: | :white_check_mark: | [georadius_roBuffer][1]         | :white_check_mark: | :white_check_mark: |
| [georadiusbymember]    | :white_check_mark: | :white_check_mark: | [georadiusbymemberBuffer][1]    | :white_check_mark: | :white_check_mark: |
| [georadiusbymember_ro] | :white_check_mark: | :white_check_mark: | [georadiusbymember_roBuffer][1] | :white_check_mark: | :white_check_mark: |
| [geosearch]            | :white_check_mark: | :white_check_mark: | [geosearchBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [geosearchstore]       | :white_check_mark: | :white_check_mark: | [geosearchstoreBuffer][1]       | :white_check_mark: | :white_check_mark: |
| [get]                  | :white_check_mark: | :white_check_mark: | [getBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [getbit]               | :white_check_mark: | :white_check_mark: | [getbitBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [getdel]               | :white_check_mark: | :white_check_mark: | [getdelBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [getex]                | :white_check_mark: | :white_check_mark: | [getexBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [getrange]             | :white_check_mark: | :white_check_mark: | [getrangeBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [getset]               | :white_check_mark: | :white_check_mark: | [getsetBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [hdel]                 | :white_check_mark: | :white_check_mark: | [hdelBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hello]                | :white_check_mark: | :white_check_mark: | [helloBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hexists]              | :white_check_mark: | :white_check_mark: | [hexistsBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [hget]                 | :white_check_mark: | :white_check_mark: | [hgetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hgetall]              | :white_check_mark: | :white_check_mark: | [hgetallBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [hincrby]              | :white_check_mark: | :white_check_mark: | [hincrbyBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [hincrbyfloat]         | :white_check_mark: | :white_check_mark: | [hincrbyfloatBuffer][1]         | :white_check_mark: | :white_check_mark: |
| [hkeys]                | :white_check_mark: | :white_check_mark: | [hkeysBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hlen]                 | :white_check_mark: | :white_check_mark: | [hlenBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hmget]                | :white_check_mark: | :white_check_mark: | [hmgetBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hmset]                | :white_check_mark: | :white_check_mark: | [hmsetBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [host:]                | :white_check_mark: | :white_check_mark: | [host:Buffer][1]                | :white_check_mark: | :white_check_mark: |
| [hrandfield]           | :white_check_mark: | :white_check_mark: | [hrandfieldBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [hscan]                | :white_check_mark: | :white_check_mark: | [hscanBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hset]                 | :white_check_mark: | :white_check_mark: | [hsetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hsetnx]               | :white_check_mark: | :white_check_mark: | [hsetnxBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [hstrlen]              | :white_check_mark: | :white_check_mark: | [hstrlenBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [hvals]                | :white_check_mark: | :white_check_mark: | [hvalsBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [incr]                 | :white_check_mark: | :white_check_mark: | [incrBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [incrby]               | :white_check_mark: | :white_check_mark: | [incrbyBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [incrbyfloat]          | :white_check_mark: | :white_check_mark: | [incrbyfloatBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [info]                 | :white_check_mark: | :white_check_mark: | [infoBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [keys]                 | :white_check_mark: | :white_check_mark: | [keysBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lastsave]             | :white_check_mark: | :white_check_mark: | [lastsaveBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [latency]              | :white_check_mark: | :white_check_mark: | [latencyBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [lindex]               | :white_check_mark: | :white_check_mark: | [lindexBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [linsert]              | :white_check_mark: | :white_check_mark: | [linsertBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [llen]                 | :white_check_mark: | :white_check_mark: | [llenBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lmove]                | :white_check_mark: | :white_check_mark: | [lmoveBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [lolwut]               | :white_check_mark: | :white_check_mark: | [lolwutBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [lpop]                 | :white_check_mark: | :white_check_mark: | [lpopBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lpos]                 | :white_check_mark: | :white_check_mark: | [lposBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lpush]                | :white_check_mark: | :white_check_mark: | [lpushBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [lpushx]               | :white_check_mark: | :white_check_mark: | [lpushxBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [lrange]               | :white_check_mark: | :white_check_mark: | [lrangeBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [lrem]                 | :white_check_mark: | :white_check_mark: | [lremBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lset]                 | :white_check_mark: | :white_check_mark: | [lsetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [ltrim]                | :white_check_mark: | :white_check_mark: | [ltrimBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [memory]               | :white_check_mark: | :white_check_mark: | [memoryBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [mget]                 | :white_check_mark: | :white_check_mark: | [mgetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [migrate]              | :white_check_mark: | :white_check_mark: | [migrateBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [module]               | :white_check_mark: | :white_check_mark: | [moduleBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [monitor]              | :white_check_mark: | :white_check_mark: | [monitorBuffer][1]              |        :x:         | :white_check_mark: |
| [move]                 | :white_check_mark: | :white_check_mark: | [moveBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [mset]                 | :white_check_mark: | :white_check_mark: | [msetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [msetnx]               | :white_check_mark: | :white_check_mark: | [msetnxBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [multi]                | :white_check_mark: | :white_check_mark: | [multiBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [object]               | :white_check_mark: | :white_check_mark: | [objectBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [persist]              | :white_check_mark: | :white_check_mark: | [persistBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pexpire]              | :white_check_mark: | :white_check_mark: | [pexpireBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pexpireat]            | :white_check_mark: | :white_check_mark: | [pexpireatBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [pfadd]                | :white_check_mark: | :white_check_mark: | [pfaddBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [pfcount]              | :white_check_mark: | :white_check_mark: | [pfcountBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pfdebug]              | :white_check_mark: | :white_check_mark: | [pfdebugBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pfmerge]              | :white_check_mark: | :white_check_mark: | [pfmergeBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pfselftest]           | :white_check_mark: | :white_check_mark: | [pfselftestBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [ping]                 | :white_check_mark: | :white_check_mark: | [pingBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [post]                 | :white_check_mark: | :white_check_mark: | [postBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [psetex]               | :white_check_mark: | :white_check_mark: | [psetexBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [psubscribe]           | :white_check_mark: | :white_check_mark: | [psubscribeBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [psync]                | :white_check_mark: | :white_check_mark: | [psyncBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [pttl]                 | :white_check_mark: | :white_check_mark: | [pttlBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [publish]              | :white_check_mark: | :white_check_mark: | [publishBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [pubsub]               | :white_check_mark: | :white_check_mark: | [pubsubBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [punsubscribe]         | :white_check_mark: | :white_check_mark: | [punsubscribeBuffer][1]         | :white_check_mark: | :white_check_mark: |
| [quit]                 | :white_check_mark: | :white_check_mark: | [quitBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [randomkey]            | :white_check_mark: | :white_check_mark: | [randomkeyBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [readonly]             | :white_check_mark: | :white_check_mark: | [readonlyBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [readwrite]            | :white_check_mark: | :white_check_mark: | [readwriteBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [rename]               | :white_check_mark: | :white_check_mark: | [renameBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [renamenx]             | :white_check_mark: | :white_check_mark: | [renamenxBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [replconf]             | :white_check_mark: | :white_check_mark: | [replconfBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [replicaof]            | :white_check_mark: | :white_check_mark: | [replicaofBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [reset]                | :white_check_mark: | :white_check_mark: | [resetBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [restore]              | :white_check_mark: | :white_check_mark: | [restoreBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [restore-asking]       | :white_check_mark: | :white_check_mark: | [restore-askingBuffer][1]       | :white_check_mark: | :white_check_mark: |
| [role]                 | :white_check_mark: | :white_check_mark: | [roleBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [rpop]                 | :white_check_mark: | :white_check_mark: | [rpopBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [rpoplpush]            | :white_check_mark: | :white_check_mark: | [rpoplpushBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [rpush]                | :white_check_mark: | :white_check_mark: | [rpushBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [rpushx]               | :white_check_mark: | :white_check_mark: | [rpushxBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sadd]                 | :white_check_mark: | :white_check_mark: | [saddBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [save]                 | :white_check_mark: | :white_check_mark: | [saveBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [scan]                 | :white_check_mark: | :white_check_mark: | [scanBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [scard]                | :white_check_mark: | :white_check_mark: | [scardBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [script]               | :white_check_mark: | :white_check_mark: | [scriptBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sdiff]                | :white_check_mark: | :white_check_mark: | [sdiffBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [sdiffstore]           | :white_check_mark: | :white_check_mark: | [sdiffstoreBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [select]               | :white_check_mark: | :white_check_mark: | [selectBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [set]                  | :white_check_mark: | :white_check_mark: | [setBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [setbit]               | :white_check_mark: | :white_check_mark: | [setbitBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [setex]                | :white_check_mark: | :white_check_mark: | [setexBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [setnx]                | :white_check_mark: | :white_check_mark: | [setnxBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [setrange]             | :white_check_mark: | :white_check_mark: | [setrangeBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [shutdown]             | :white_check_mark: | :white_check_mark: | [shutdownBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [sinter]               | :white_check_mark: | :white_check_mark: | [sinterBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sinterstore]          | :white_check_mark: | :white_check_mark: | [sinterstoreBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [sismember]            | :white_check_mark: | :white_check_mark: | [sismemberBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [slaveof]              | :white_check_mark: | :white_check_mark: | [slaveofBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [slowlog]              | :white_check_mark: | :white_check_mark: | [slowlogBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [smembers]             | :white_check_mark: | :white_check_mark: | [smembersBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [smismember]           | :white_check_mark: | :white_check_mark: | [smismemberBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [smove]                | :white_check_mark: | :white_check_mark: | [smoveBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [sort]                 | :white_check_mark: | :white_check_mark: | [sortBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [spop]                 | :white_check_mark: | :white_check_mark: | [spopBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [srandmember]          | :white_check_mark: | :white_check_mark: | [srandmemberBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [srem]                 | :white_check_mark: | :white_check_mark: | [sremBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [sscan]                | :white_check_mark: | :white_check_mark: | [sscanBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [stralgo]              | :white_check_mark: | :white_check_mark: | [stralgoBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [strlen]               | :white_check_mark: | :white_check_mark: | [strlenBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [subscribe]            | :white_check_mark: | :white_check_mark: | [subscribeBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [substr]               | :white_check_mark: | :white_check_mark: | [substrBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sunion]               | :white_check_mark: | :white_check_mark: | [sunionBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sunionstore]          | :white_check_mark: | :white_check_mark: | [sunionstoreBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [swapdb]               | :white_check_mark: | :white_check_mark: | [swapdbBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [sync]                 | :white_check_mark: | :white_check_mark: | [syncBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [time]                 | :white_check_mark: | :white_check_mark: | [timeBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [touch]                | :white_check_mark: | :white_check_mark: | [touchBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [ttl]                  | :white_check_mark: | :white_check_mark: | [ttlBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [type]                 | :white_check_mark: | :white_check_mark: | [typeBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [unlink]               | :white_check_mark: | :white_check_mark: | [unlinkBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [unsubscribe]          | :white_check_mark: | :white_check_mark: | [unsubscribeBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [unwatch]              | :white_check_mark: | :white_check_mark: | [unwatchBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [wait]                 | :white_check_mark: | :white_check_mark: | [waitBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [watch]                | :white_check_mark: | :white_check_mark: | [watchBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [xack]                 | :white_check_mark: | :white_check_mark: | [xackBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [xadd]                 | :white_check_mark: | :white_check_mark: | [xaddBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [xautoclaim]           | :white_check_mark: | :white_check_mark: | [xautoclaimBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [xclaim]               | :white_check_mark: | :white_check_mark: | [xclaimBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [xdel]                 | :white_check_mark: | :white_check_mark: | [xdelBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [xgroup]               | :white_check_mark: | :white_check_mark: | [xgroupBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [xinfo]                | :white_check_mark: | :white_check_mark: | [xinfoBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [xlen]                 | :white_check_mark: | :white_check_mark: | [xlenBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [xpending]             | :white_check_mark: | :white_check_mark: | [xpendingBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [xrange]               | :white_check_mark: | :white_check_mark: | [xrangeBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [xread]                | :white_check_mark: | :white_check_mark: | [xreadBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [xreadgroup]           | :white_check_mark: | :white_check_mark: | [xreadgroupBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [xrevrange]            | :white_check_mark: | :white_check_mark: | [xrevrangeBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [xsetid]               | :white_check_mark: | :white_check_mark: | [xsetidBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [xtrim]                | :white_check_mark: | :white_check_mark: | [xtrimBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [zadd]                 | :white_check_mark: | :white_check_mark: | [zaddBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [zcard]                | :white_check_mark: | :white_check_mark: | [zcardBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [zcount]               | :white_check_mark: | :white_check_mark: | [zcountBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [zdiff]                | :white_check_mark: | :white_check_mark: | [zdiffBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [zdiffstore]           | :white_check_mark: | :white_check_mark: | [zdiffstoreBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [zincrby]              | :white_check_mark: | :white_check_mark: | [zincrbyBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [zinter]               | :white_check_mark: | :white_check_mark: | [zinterBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [zinterstore]          | :white_check_mark: | :white_check_mark: | [zinterstoreBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [zlexcount]            | :white_check_mark: | :white_check_mark: | [zlexcountBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [zmscore]              | :white_check_mark: | :white_check_mark: | [zmscoreBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [zpopmax]              | :white_check_mark: | :white_check_mark: | [zpopmaxBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [zpopmin]              | :white_check_mark: | :white_check_mark: | [zpopminBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [zrandmember]          | :white_check_mark: | :white_check_mark: | [zrandmemberBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [zrange]               | :white_check_mark: | :white_check_mark: | [zrangeBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [zrangebylex]          | :white_check_mark: | :white_check_mark: | [zrangebylexBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [zrangebyscore]        | :white_check_mark: | :white_check_mark: | [zrangebyscoreBuffer][1]        | :white_check_mark: | :white_check_mark: |
| [zrangestore]          | :white_check_mark: | :white_check_mark: | [zrangestoreBuffer][1]          | :white_check_mark: | :white_check_mark: |
| [zrank]                | :white_check_mark: | :white_check_mark: | [zrankBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [zrem]                 | :white_check_mark: | :white_check_mark: | [zremBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [zremrangebylex]       | :white_check_mark: | :white_check_mark: | [zremrangebylexBuffer][1]       | :white_check_mark: | :white_check_mark: |
| [zremrangebyrank]      | :white_check_mark: | :white_check_mark: | [zremrangebyrankBuffer][1]      | :white_check_mark: | :white_check_mark: |
| [zremrangebyscore]     | :white_check_mark: | :white_check_mark: | [zremrangebyscoreBuffer][1]     | :white_check_mark: | :white_check_mark: |
| [zrevrange]            | :white_check_mark: | :white_check_mark: | [zrevrangeBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [zrevrangebylex]       | :white_check_mark: | :white_check_mark: | [zrevrangebylexBuffer][1]       | :white_check_mark: | :white_check_mark: |
| [zrevrangebyscore]     | :white_check_mark: | :white_check_mark: | [zrevrangebyscoreBuffer][1]     | :white_check_mark: | :white_check_mark: |
| [zrevrank]             | :white_check_mark: | :white_check_mark: | [zrevrankBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [zscan]                | :white_check_mark: | :white_check_mark: | [zscanBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [zscore]               | :white_check_mark: | :white_check_mark: | [zscoreBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [zunion]               | :white_check_mark: | :white_check_mark: | [zunionBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [zunionstore]          | :white_check_mark: | :white_check_mark: | [zunionstoreBuffer][1]          | :white_check_mark: | :white_check_mark: |

[1]: https://github.com/luin/ioredis#handle-binary-data
[acl]: http://redis.io/commands/ACL
[append]: http://redis.io/commands/APPEND
[asking]: http://redis.io/commands/ASKING
[auth]: http://redis.io/commands/AUTH
[bgrewriteaof]: http://redis.io/commands/BGREWRITEAOF
[bgsave]: http://redis.io/commands/BGSAVE
[bitcount]: http://redis.io/commands/BITCOUNT
[bitfield]: http://redis.io/commands/BITFIELD
[bitfield_ro]: http://redis.io/commands/BITFIELD_RO
[bitop]: http://redis.io/commands/BITOP
[bitpos]: http://redis.io/commands/BITPOS
[blmove]: http://redis.io/commands/BLMOVE
[blpop]: http://redis.io/commands/BLPOP
[brpop]: http://redis.io/commands/BRPOP
[brpoplpush]: http://redis.io/commands/BRPOPLPUSH
[bzpopmax]: http://redis.io/commands/BZPOPMAX
[bzpopmin]: http://redis.io/commands/BZPOPMIN
[client]: http://redis.io/commands/CLIENT
[cluster]: http://redis.io/commands/CLUSTER
[command]: http://redis.io/commands/COMMAND
[config]: http://redis.io/commands/CONFIG
[copy]: http://redis.io/commands/COPY
[dbsize]: http://redis.io/commands/DBSIZE
[debug]: http://redis.io/commands/DEBUG
[decr]: http://redis.io/commands/DECR
[decrby]: http://redis.io/commands/DECRBY
[del]: http://redis.io/commands/DEL
[discard]: http://redis.io/commands/DISCARD
[dump]: http://redis.io/commands/DUMP
[echo]: http://redis.io/commands/ECHO
[eval]: http://redis.io/commands/EVAL
[evalsha]: http://redis.io/commands/EVALSHA
[exec]: http://redis.io/commands/EXEC
[exists]: http://redis.io/commands/EXISTS
[expire]: http://redis.io/commands/EXPIRE
[expireat]: http://redis.io/commands/EXPIREAT
[failover]: http://redis.io/commands/FAILOVER
[flushall]: http://redis.io/commands/FLUSHALL
[flushdb]: http://redis.io/commands/FLUSHDB
[geoadd]: http://redis.io/commands/GEOADD
[geodist]: http://redis.io/commands/GEODIST
[geohash]: http://redis.io/commands/GEOHASH
[geopos]: http://redis.io/commands/GEOPOS
[georadius]: http://redis.io/commands/GEORADIUS
[georadius_ro]: http://redis.io/commands/GEORADIUS_RO
[georadiusbymember]: http://redis.io/commands/GEORADIUSBYMEMBER
[georadiusbymember_ro]: http://redis.io/commands/GEORADIUSBYMEMBER_RO
[geosearch]: http://redis.io/commands/GEOSEARCH
[geosearchstore]: http://redis.io/commands/GEOSEARCHSTORE
[get]: http://redis.io/commands/GET
[getbit]: http://redis.io/commands/GETBIT
[getdel]: http://redis.io/commands/GETDEL
[getex]: http://redis.io/commands/GETEX
[getrange]: http://redis.io/commands/GETRANGE
[getset]: http://redis.io/commands/GETSET
[hdel]: http://redis.io/commands/HDEL
[hello]: http://redis.io/commands/HELLO
[hexists]: http://redis.io/commands/HEXISTS
[hget]: http://redis.io/commands/HGET
[hgetall]: http://redis.io/commands/HGETALL
[hincrby]: http://redis.io/commands/HINCRBY
[hincrbyfloat]: http://redis.io/commands/HINCRBYFLOAT
[hkeys]: http://redis.io/commands/HKEYS
[hlen]: http://redis.io/commands/HLEN
[hmget]: http://redis.io/commands/HMGET
[hmset]: http://redis.io/commands/HMSET
[host:]: http://redis.io/commands/HOST:
[hrandfield]: http://redis.io/commands/HRANDFIELD
[hscan]: http://redis.io/commands/HSCAN
[hset]: http://redis.io/commands/HSET
[hsetnx]: http://redis.io/commands/HSETNX
[hstrlen]: http://redis.io/commands/HSTRLEN
[hvals]: http://redis.io/commands/HVALS
[incr]: http://redis.io/commands/INCR
[incrby]: http://redis.io/commands/INCRBY
[incrbyfloat]: http://redis.io/commands/INCRBYFLOAT
[info]: http://redis.io/commands/INFO
[keys]: http://redis.io/commands/KEYS
[lastsave]: http://redis.io/commands/LASTSAVE
[latency]: http://redis.io/commands/LATENCY
[lindex]: http://redis.io/commands/LINDEX
[linsert]: http://redis.io/commands/LINSERT
[llen]: http://redis.io/commands/LLEN
[lmove]: http://redis.io/commands/LMOVE
[lolwut]: http://redis.io/commands/LOLWUT
[lpop]: http://redis.io/commands/LPOP
[lpos]: http://redis.io/commands/LPOS
[lpush]: http://redis.io/commands/LPUSH
[lpushx]: http://redis.io/commands/LPUSHX
[lrange]: http://redis.io/commands/LRANGE
[lrem]: http://redis.io/commands/LREM
[lset]: http://redis.io/commands/LSET
[ltrim]: http://redis.io/commands/LTRIM
[memory]: http://redis.io/commands/MEMORY
[mget]: http://redis.io/commands/MGET
[migrate]: http://redis.io/commands/MIGRATE
[module]: http://redis.io/commands/MODULE
[monitor]: http://redis.io/commands/MONITOR
[move]: http://redis.io/commands/MOVE
[mset]: http://redis.io/commands/MSET
[msetnx]: http://redis.io/commands/MSETNX
[multi]: http://redis.io/commands/MULTI
[object]: http://redis.io/commands/OBJECT
[persist]: http://redis.io/commands/PERSIST
[pexpire]: http://redis.io/commands/PEXPIRE
[pexpireat]: http://redis.io/commands/PEXPIREAT
[pfadd]: http://redis.io/commands/PFADD
[pfcount]: http://redis.io/commands/PFCOUNT
[pfdebug]: http://redis.io/commands/PFDEBUG
[pfmerge]: http://redis.io/commands/PFMERGE
[pfselftest]: http://redis.io/commands/PFSELFTEST
[ping]: http://redis.io/commands/PING
[post]: http://redis.io/commands/POST
[psetex]: http://redis.io/commands/PSETEX
[psubscribe]: http://redis.io/commands/PSUBSCRIBE
[psync]: http://redis.io/commands/PSYNC
[pttl]: http://redis.io/commands/PTTL
[publish]: http://redis.io/commands/PUBLISH
[pubsub]: http://redis.io/commands/PUBSUB
[punsubscribe]: http://redis.io/commands/PUNSUBSCRIBE
[quit]: http://redis.io/commands/QUIT
[randomkey]: http://redis.io/commands/RANDOMKEY
[readonly]: http://redis.io/commands/READONLY
[readwrite]: http://redis.io/commands/READWRITE
[rename]: http://redis.io/commands/RENAME
[renamenx]: http://redis.io/commands/RENAMENX
[replconf]: http://redis.io/commands/REPLCONF
[replicaof]: http://redis.io/commands/REPLICAOF
[reset]: http://redis.io/commands/RESET
[restore]: http://redis.io/commands/RESTORE
[restore-asking]: http://redis.io/commands/RESTORE-ASKING
[role]: http://redis.io/commands/ROLE
[rpop]: http://redis.io/commands/RPOP
[rpoplpush]: http://redis.io/commands/RPOPLPUSH
[rpush]: http://redis.io/commands/RPUSH
[rpushx]: http://redis.io/commands/RPUSHX
[sadd]: http://redis.io/commands/SADD
[save]: http://redis.io/commands/SAVE
[scan]: http://redis.io/commands/SCAN
[scard]: http://redis.io/commands/SCARD
[script]: http://redis.io/commands/SCRIPT
[sdiff]: http://redis.io/commands/SDIFF
[sdiffstore]: http://redis.io/commands/SDIFFSTORE
[select]: http://redis.io/commands/SELECT
[set]: http://redis.io/commands/SET
[setbit]: http://redis.io/commands/SETBIT
[setex]: http://redis.io/commands/SETEX
[setnx]: http://redis.io/commands/SETNX
[setrange]: http://redis.io/commands/SETRANGE
[shutdown]: http://redis.io/commands/SHUTDOWN
[sinter]: http://redis.io/commands/SINTER
[sinterstore]: http://redis.io/commands/SINTERSTORE
[sismember]: http://redis.io/commands/SISMEMBER
[slaveof]: http://redis.io/commands/SLAVEOF
[slowlog]: http://redis.io/commands/SLOWLOG
[smembers]: http://redis.io/commands/SMEMBERS
[smismember]: http://redis.io/commands/SMISMEMBER
[smove]: http://redis.io/commands/SMOVE
[sort]: http://redis.io/commands/SORT
[spop]: http://redis.io/commands/SPOP
[srandmember]: http://redis.io/commands/SRANDMEMBER
[srem]: http://redis.io/commands/SREM
[sscan]: http://redis.io/commands/SSCAN
[stralgo]: http://redis.io/commands/STRALGO
[strlen]: http://redis.io/commands/STRLEN
[subscribe]: http://redis.io/commands/SUBSCRIBE
[substr]: http://redis.io/commands/SUBSTR
[sunion]: http://redis.io/commands/SUNION
[sunionstore]: http://redis.io/commands/SUNIONSTORE
[swapdb]: http://redis.io/commands/SWAPDB
[sync]: http://redis.io/commands/SYNC
[time]: http://redis.io/commands/TIME
[touch]: http://redis.io/commands/TOUCH
[ttl]: http://redis.io/commands/TTL
[type]: http://redis.io/commands/TYPE
[unlink]: http://redis.io/commands/UNLINK
[unsubscribe]: http://redis.io/commands/UNSUBSCRIBE
[unwatch]: http://redis.io/commands/UNWATCH
[wait]: http://redis.io/commands/WAIT
[watch]: http://redis.io/commands/WATCH
[xack]: http://redis.io/commands/XACK
[xadd]: http://redis.io/commands/XADD
[xautoclaim]: http://redis.io/commands/XAUTOCLAIM
[xclaim]: http://redis.io/commands/XCLAIM
[xdel]: http://redis.io/commands/XDEL
[xgroup]: http://redis.io/commands/XGROUP
[xinfo]: http://redis.io/commands/XINFO
[xlen]: http://redis.io/commands/XLEN
[xpending]: http://redis.io/commands/XPENDING
[xrange]: http://redis.io/commands/XRANGE
[xread]: http://redis.io/commands/XREAD
[xreadgroup]: http://redis.io/commands/XREADGROUP
[xrevrange]: http://redis.io/commands/XREVRANGE
[xsetid]: http://redis.io/commands/XSETID
[xtrim]: http://redis.io/commands/XTRIM
[zadd]: http://redis.io/commands/ZADD
[zcard]: http://redis.io/commands/ZCARD
[zcount]: http://redis.io/commands/ZCOUNT
[zdiff]: http://redis.io/commands/ZDIFF
[zdiffstore]: http://redis.io/commands/ZDIFFSTORE
[zincrby]: http://redis.io/commands/ZINCRBY
[zinter]: http://redis.io/commands/ZINTER
[zinterstore]: http://redis.io/commands/ZINTERSTORE
[zlexcount]: http://redis.io/commands/ZLEXCOUNT
[zmscore]: http://redis.io/commands/ZMSCORE
[zpopmax]: http://redis.io/commands/ZPOPMAX
[zpopmin]: http://redis.io/commands/ZPOPMIN
[zrandmember]: http://redis.io/commands/ZRANDMEMBER
[zrange]: http://redis.io/commands/ZRANGE
[zrangebylex]: http://redis.io/commands/ZRANGEBYLEX
[zrangebyscore]: http://redis.io/commands/ZRANGEBYSCORE
[zrangestore]: http://redis.io/commands/ZRANGESTORE
[zrank]: http://redis.io/commands/ZRANK
[zrem]: http://redis.io/commands/ZREM
[zremrangebylex]: http://redis.io/commands/ZREMRANGEBYLEX
[zremrangebyrank]: http://redis.io/commands/ZREMRANGEBYRANK
[zremrangebyscore]: http://redis.io/commands/ZREMRANGEBYSCORE
[zrevrange]: http://redis.io/commands/ZREVRANGE
[zrevrangebylex]: http://redis.io/commands/ZREVRANGEBYLEX
[zrevrangebyscore]: http://redis.io/commands/ZREVRANGEBYSCORE
[zrevrank]: http://redis.io/commands/ZREVRANK
[zscan]: http://redis.io/commands/ZSCAN
[zscore]: http://redis.io/commands/ZSCORE
[zunion]: http://redis.io/commands/ZUNION
[zunionstore]: http://redis.io/commands/ZUNIONSTORE
