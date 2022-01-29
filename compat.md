## Supported commands ![Commands Coverage: 38%](https://img.shields.io/badge/coverage-38%25-orange.svg)

| redis                  |      ioredis       |    ioredis-mock    | buffer                          |      ioredis       |    ioredis-mock    |
| ---------------------- | :----------------: | :----------------: | ------------------------------- | :----------------: | :----------------: |
| [acl]                  | :white_check_mark: |        :x:         | [aclBuffer][1]                  | :white_check_mark: |        :x:         |
| [append]               | :white_check_mark: | :white_check_mark: | [appendBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [asking]               | :white_check_mark: |        :x:         | [askingBuffer][1]               | :white_check_mark: |        :x:         |
| [auth]                 | :white_check_mark: | :white_check_mark: | [authBuffer][1]                 | :white_check_mark: |        :x:         |
| [bgrewriteaof]         | :white_check_mark: | :white_check_mark: | [bgrewriteaofBuffer][1]         | :white_check_mark: | :white_check_mark: |
| [bgsave]               | :white_check_mark: | :white_check_mark: | [bgsaveBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [bitcount]             | :white_check_mark: |        :x:         | [bitcountBuffer][1]             | :white_check_mark: |        :x:         |
| [bitfield]             | :white_check_mark: |        :x:         | [bitfieldBuffer][1]             | :white_check_mark: |        :x:         |
| [bitfield_ro]          | :white_check_mark: |        :x:         | [bitfield_roBuffer][1]          | :white_check_mark: |        :x:         |
| [bitop]                | :white_check_mark: |        :x:         | [bitopBuffer][1]                | :white_check_mark: |        :x:         |
| [bitpos]               | :white_check_mark: |        :x:         | [bitposBuffer][1]               | :white_check_mark: |        :x:         |
| [blmove]               | :white_check_mark: |        :x:         | [blmoveBuffer][1]               | :white_check_mark: |        :x:         |
| [blpop]                | :white_check_mark: |        :x:         | [blpopBuffer][1]                | :white_check_mark: |        :x:         |
| [brpop]                | :white_check_mark: |        :x:         | [brpopBuffer][1]                | :white_check_mark: |        :x:         |
| [brpoplpush]           | :white_check_mark: | :white_check_mark: | [brpoplpushBuffer][1]           | :white_check_mark: | :white_check_mark: |
| [bzpopmax]             | :white_check_mark: |        :x:         | [bzpopmaxBuffer][1]             | :white_check_mark: |        :x:         |
| [bzpopmin]             | :white_check_mark: |        :x:         | [bzpopminBuffer][1]             | :white_check_mark: |        :x:         |
| [client]               | :white_check_mark: |        :x:         | [clientBuffer][1]               | :white_check_mark: |        :x:         |
| [cluster]              | :white_check_mark: |        :x:         | [clusterBuffer][1]              | :white_check_mark: |        :x:         |
| [command]              | :white_check_mark: |        :x:         | [commandBuffer][1]              | :white_check_mark: |        :x:         |
| [config]               | :white_check_mark: |        :x:         | [configBuffer][1]               | :white_check_mark: |        :x:         |
| [copy]                 | :white_check_mark: |        :x:         | [copyBuffer][1]                 | :white_check_mark: |        :x:         |
| [dbsize]               | :white_check_mark: | :white_check_mark: | [dbsizeBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [decr]                 | :white_check_mark: | :white_check_mark: | [decrBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [decrby]               | :white_check_mark: | :white_check_mark: | [decrbyBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [del]                  | :white_check_mark: | :white_check_mark: | [delBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [discard]              | :white_check_mark: | :white_check_mark: | [discardBuffer][1]              | :white_check_mark: |        :x:         |
| [echo]                 | :white_check_mark: | :white_check_mark: | [echoBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [eval]                 | :white_check_mark: | :white_check_mark: | [evalBuffer][1]                 | :white_check_mark: |        :x:         |
| [evalsha]              | :white_check_mark: | :white_check_mark: | [evalshaBuffer][1]              | :white_check_mark: |        :x:         |
| [exists]               | :white_check_mark: | :white_check_mark: | [existsBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [expire]               | :white_check_mark: | :white_check_mark: | [expireBuffer][1]               | :white_check_mark: |        :x:         |
| [expireat]             | :white_check_mark: | :white_check_mark: | [expireatBuffer][1]             | :white_check_mark: |        :x:         |
| [failover]             | :white_check_mark: |        :x:         | [failoverBuffer][1]             | :white_check_mark: |        :x:         |
| [flushall]             | :white_check_mark: | :white_check_mark: | [flushallBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [flushdb]              | :white_check_mark: | :white_check_mark: | [flushdbBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [geoadd]               | :white_check_mark: |        :x:         | [geoaddBuffer][1]               | :white_check_mark: |        :x:         |
| [geodist]              | :white_check_mark: |        :x:         | [geodistBuffer][1]              | :white_check_mark: |        :x:         |
| [geohash]              | :white_check_mark: |        :x:         | [geohashBuffer][1]              | :white_check_mark: |        :x:         |
| [geopos]               | :white_check_mark: |        :x:         | [geoposBuffer][1]               | :white_check_mark: |        :x:         |
| [georadius]            | :white_check_mark: |        :x:         | [georadiusBuffer][1]            | :white_check_mark: |        :x:         |
| [georadius_ro]         | :white_check_mark: |        :x:         | [georadius_roBuffer][1]         | :white_check_mark: |        :x:         |
| [georadiusbymember]    | :white_check_mark: |        :x:         | [georadiusbymemberBuffer][1]    | :white_check_mark: |        :x:         |
| [georadiusbymember_ro] | :white_check_mark: |        :x:         | [georadiusbymember_roBuffer][1] | :white_check_mark: |        :x:         |
| [geosearch]            | :white_check_mark: |        :x:         | [geosearchBuffer][1]            | :white_check_mark: |        :x:         |
| [geosearchstore]       | :white_check_mark: |        :x:         | [geosearchstoreBuffer][1]       | :white_check_mark: |        :x:         |
| [get]                  | :white_check_mark: | :white_check_mark: | [getBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [getbit]               | :white_check_mark: | :white_check_mark: | [getbitBuffer][1]               | :white_check_mark: | :white_check_mark: |
| [getdel]               | :white_check_mark: |        :x:         | [getdelBuffer][1]               | :white_check_mark: |        :x:         |
| [getex]                | :white_check_mark: |        :x:         | [getexBuffer][1]                | :white_check_mark: |        :x:         |
| [getrange]             | :white_check_mark: | :white_check_mark: | [getrangeBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [getset]               | :white_check_mark: | :white_check_mark: | [getsetBuffer][1]               | :white_check_mark: |        :x:         |
| [hdel]                 | :white_check_mark: | :white_check_mark: | [hdelBuffer][1]                 | :white_check_mark: |        :x:         |
| [hexists]              | :white_check_mark: | :white_check_mark: | [hexistsBuffer][1]              | :white_check_mark: |        :x:         |
| [hget]                 | :white_check_mark: | :white_check_mark: | [hgetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hgetall]              | :white_check_mark: | :white_check_mark: | [hgetallBuffer][1]              | :white_check_mark: | :white_check_mark: |
| [hincrby]              | :white_check_mark: | :white_check_mark: | [hincrbyBuffer][1]              | :white_check_mark: |        :x:         |
| [hincrbyfloat]         | :white_check_mark: | :white_check_mark: | [hincrbyfloatBuffer][1]         | :white_check_mark: |        :x:         |
| [hkeys]                | :white_check_mark: | :white_check_mark: | [hkeysBuffer][1]                | :white_check_mark: |        :x:         |
| [hlen]                 | :white_check_mark: | :white_check_mark: | [hlenBuffer][1]                 | :white_check_mark: |        :x:         |
| [hmget]                | :white_check_mark: | :white_check_mark: | [hmgetBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hmset]                | :white_check_mark: | :white_check_mark: | [hmsetBuffer][1]                | :white_check_mark: | :white_check_mark: |
| [hrandfield]           | :white_check_mark: |        :x:         | [hrandfieldBuffer][1]           | :white_check_mark: |        :x:         |
| [hscan]                | :white_check_mark: | :white_check_mark: | [hscanBuffer][1]                | :white_check_mark: |        :x:         |
| [hset]                 | :white_check_mark: | :white_check_mark: | [hsetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [hsetnx]               | :white_check_mark: | :white_check_mark: | [hsetnxBuffer][1]               | :white_check_mark: |        :x:         |
| [hstrlen]              | :white_check_mark: | :white_check_mark: | [hstrlenBuffer][1]              | :white_check_mark: |        :x:         |
| [hvals]                | :white_check_mark: | :white_check_mark: | [hvalsBuffer][1]                | :white_check_mark: |        :x:         |
| [incr]                 | :white_check_mark: | :white_check_mark: | [incrBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [incrby]               | :white_check_mark: | :white_check_mark: | [incrbyBuffer][1]               | :white_check_mark: |        :x:         |
| [incrbyfloat]          | :white_check_mark: | :white_check_mark: | [incrbyfloatBuffer][1]          | :white_check_mark: |        :x:         |
| [info]                 | :white_check_mark: | :white_check_mark: | [infoBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [keys]                 | :white_check_mark: | :white_check_mark: | [keysBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lastsave]             | :white_check_mark: | :white_check_mark: | [lastsaveBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [lindex]               | :white_check_mark: | :white_check_mark: | [lindexBuffer][1]               | :white_check_mark: |        :x:         |
| [linsert]              | :white_check_mark: | :white_check_mark: | [linsertBuffer][1]              | :white_check_mark: |        :x:         |
| [llen]                 | :white_check_mark: | :white_check_mark: | [llenBuffer][1]                 | :white_check_mark: |        :x:         |
| [lmove]                | :white_check_mark: |        :x:         | [lmoveBuffer][1]                | :white_check_mark: |        :x:         |
| [lolwut]               | :white_check_mark: |        :x:         | [lolwutBuffer][1]               | :white_check_mark: |        :x:         |
| [lpop]                 | :white_check_mark: | :white_check_mark: | [lpopBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [lpos]                 | :white_check_mark: |        :x:         | [lposBuffer][1]                 | :white_check_mark: |        :x:         |
| [lpush]                | :white_check_mark: | :white_check_mark: | [lpushBuffer][1]                | :white_check_mark: |        :x:         |
| [lpushx]               | :white_check_mark: | :white_check_mark: | [lpushxBuffer][1]               | :white_check_mark: |        :x:         |
| [lrange]               | :white_check_mark: | :white_check_mark: | [lrangeBuffer][1]               | :white_check_mark: |        :x:         |
| [lrem]                 | :white_check_mark: | :white_check_mark: | [lremBuffer][1]                 | :white_check_mark: |        :x:         |
| [lset]                 | :white_check_mark: | :white_check_mark: | [lsetBuffer][1]                 | :white_check_mark: |        :x:         |
| [ltrim]                | :white_check_mark: | :white_check_mark: | [ltrimBuffer][1]                | :white_check_mark: |        :x:         |
| [memory]               | :white_check_mark: |        :x:         | [memoryBuffer][1]               | :white_check_mark: |        :x:         |
| [mget]                 | :white_check_mark: | :white_check_mark: | [mgetBuffer][1]                 | :white_check_mark: |        :x:         |
| [migrate]              | :white_check_mark: |        :x:         | [migrateBuffer][1]              | :white_check_mark: |        :x:         |
| [monitor]              | :white_check_mark: |        :x:         | [monitorBuffer][1]              |        :x:         |        :x:         |
| [move]                 | :white_check_mark: |        :x:         | [moveBuffer][1]                 | :white_check_mark: |        :x:         |
| [mset]                 | :white_check_mark: | :white_check_mark: | [msetBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [msetnx]               | :white_check_mark: | :white_check_mark: | [msetnxBuffer][1]               | :white_check_mark: |        :x:         |
| [object]               | :white_check_mark: |        :x:         | [objectBuffer][1]               | :white_check_mark: |        :x:         |
| [persist]              | :white_check_mark: | :white_check_mark: | [persistBuffer][1]              | :white_check_mark: |        :x:         |
| [pexpire]              | :white_check_mark: | :white_check_mark: | [pexpireBuffer][1]              | :white_check_mark: |        :x:         |
| [pexpireat]            | :white_check_mark: | :white_check_mark: | [pexpireatBuffer][1]            | :white_check_mark: |        :x:         |
| [pfadd]                | :white_check_mark: |        :x:         | [pfaddBuffer][1]                | :white_check_mark: |        :x:         |
| [pfcount]              | :white_check_mark: |        :x:         | [pfcountBuffer][1]              | :white_check_mark: |        :x:         |
| [pfdebug]              | :white_check_mark: |        :x:         | [pfdebugBuffer][1]              | :white_check_mark: |        :x:         |
| [pfmerge]              | :white_check_mark: |        :x:         | [pfmergeBuffer][1]              | :white_check_mark: |        :x:         |
| [ping]                 | :white_check_mark: | :white_check_mark: | [pingBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [psetex]               | :white_check_mark: | :white_check_mark: | [psetexBuffer][1]               | :white_check_mark: |        :x:         |
| [psubscribe]           | :white_check_mark: | :white_check_mark: | [psubscribeBuffer][1]           | :white_check_mark: |        :x:         |
| [psync]                | :white_check_mark: |        :x:         | [psyncBuffer][1]                | :white_check_mark: |        :x:         |
| [pttl]                 | :white_check_mark: | :white_check_mark: | [pttlBuffer][1]                 | :white_check_mark: |        :x:         |
| [publish]              | :white_check_mark: | :white_check_mark: | [publishBuffer][1]              | :white_check_mark: |        :x:         |
| [pubsub]               | :white_check_mark: |        :x:         | [pubsubBuffer][1]               | :white_check_mark: |        :x:         |
| [punsubscribe]         | :white_check_mark: | :white_check_mark: | [punsubscribeBuffer][1]         | :white_check_mark: |        :x:         |
| [quit]                 | :white_check_mark: | :white_check_mark: | [quitBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [randomkey]            | :white_check_mark: | :white_check_mark: | [randomkeyBuffer][1]            | :white_check_mark: |        :x:         |
| [readonly]             | :white_check_mark: |        :x:         | [readonlyBuffer][1]             | :white_check_mark: |        :x:         |
| [readwrite]            | :white_check_mark: |        :x:         | [readwriteBuffer][1]            | :white_check_mark: |        :x:         |
| [rename]               | :white_check_mark: | :white_check_mark: | [renameBuffer][1]               | :white_check_mark: |        :x:         |
| [renamenx]             | :white_check_mark: | :white_check_mark: | [renamenxBuffer][1]             | :white_check_mark: |        :x:         |
| [replconf]             | :white_check_mark: | :white_check_mark: | [replconfBuffer][1]             | :white_check_mark: | :white_check_mark: |
| [replicaof]            | :white_check_mark: |        :x:         | [replicaofBuffer][1]            | :white_check_mark: |        :x:         |
| [reset]                | :white_check_mark: |        :x:         | [resetBuffer][1]                | :white_check_mark: |        :x:         |
| [role]                 | :white_check_mark: | :white_check_mark: | [roleBuffer][1]                 | :white_check_mark: |        :x:         |
| [rpop]                 | :white_check_mark: | :white_check_mark: | [rpopBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [rpoplpush]            | :white_check_mark: | :white_check_mark: | [rpoplpushBuffer][1]            | :white_check_mark: | :white_check_mark: |
| [rpush]                | :white_check_mark: | :white_check_mark: | [rpushBuffer][1]                | :white_check_mark: |        :x:         |
| [rpushx]               | :white_check_mark: | :white_check_mark: | [rpushxBuffer][1]               | :white_check_mark: |        :x:         |
| [sadd]                 | :white_check_mark: | :white_check_mark: | [saddBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [save]                 | :white_check_mark: | :white_check_mark: | [saveBuffer][1]                 | :white_check_mark: | :white_check_mark: |
| [scan]                 | :white_check_mark: | :white_check_mark: | [scanBuffer][1]                 | :white_check_mark: |        :x:         |
| [scard]                | :white_check_mark: | :white_check_mark: | [scardBuffer][1]                | :white_check_mark: |        :x:         |
| [script]               | :white_check_mark: |        :x:         | [scriptBuffer][1]               | :white_check_mark: |        :x:         |
| [sdiff]                | :white_check_mark: | :white_check_mark: | [sdiffBuffer][1]                | :white_check_mark: |        :x:         |
| [sdiffstore]           | :white_check_mark: | :white_check_mark: | [sdiffstoreBuffer][1]           | :white_check_mark: |        :x:         |
| [select]               | :white_check_mark: |        :x:         | [selectBuffer][1]               | :white_check_mark: |        :x:         |
| [set]                  | :white_check_mark: | :white_check_mark: | [setBuffer][1]                  | :white_check_mark: | :white_check_mark: |
| [setbit]               | :white_check_mark: | :white_check_mark: | [setbitBuffer][1]               | :white_check_mark: |        :x:         |
| [setex]                | :white_check_mark: | :white_check_mark: | [setexBuffer][1]                | :white_check_mark: |        :x:         |
| [setnx]                | :white_check_mark: | :white_check_mark: | [setnxBuffer][1]                | :white_check_mark: |        :x:         |
| [setrange]             | :white_check_mark: |        :x:         | [setrangeBuffer][1]             | :white_check_mark: |        :x:         |
| [shutdown]             | :white_check_mark: |        :x:         | [shutdownBuffer][1]             | :white_check_mark: |        :x:         |
| [sinter]               | :white_check_mark: | :white_check_mark: | [sinterBuffer][1]               | :white_check_mark: |        :x:         |
| [sinterstore]          | :white_check_mark: | :white_check_mark: | [sinterstoreBuffer][1]          | :white_check_mark: |        :x:         |
| [sismember]            | :white_check_mark: | :white_check_mark: | [sismemberBuffer][1]            | :white_check_mark: |        :x:         |
| [slaveof]              | :white_check_mark: |        :x:         | [slaveofBuffer][1]              | :white_check_mark: |        :x:         |
| [smembers]             | :white_check_mark: | :white_check_mark: | [smembersBuffer][1]             | :white_check_mark: |        :x:         |
| [smismember]           | :white_check_mark: | :white_check_mark: | [smismemberBuffer][1]           | :white_check_mark: |        :x:         |
| [smove]                | :white_check_mark: | :white_check_mark: | [smoveBuffer][1]                | :white_check_mark: |        :x:         |
| [sort]                 | :white_check_mark: |        :x:         | [sortBuffer][1]                 | :white_check_mark: |        :x:         |
| [spop]                 | :white_check_mark: | :white_check_mark: | [spopBuffer][1]                 | :white_check_mark: |        :x:         |
| [srandmember]          | :white_check_mark: | :white_check_mark: | [srandmemberBuffer][1]          | :white_check_mark: |        :x:         |
| [srem]                 | :white_check_mark: | :white_check_mark: | [sremBuffer][1]                 | :white_check_mark: |        :x:         |
| [sscan]                | :white_check_mark: | :white_check_mark: | [sscanBuffer][1]                | :white_check_mark: |        :x:         |
| [stralgo]              | :white_check_mark: |        :x:         | [stralgoBuffer][1]              | :white_check_mark: |        :x:         |
| [strlen]               | :white_check_mark: | :white_check_mark: | [strlenBuffer][1]               | :white_check_mark: |        :x:         |
| [subscribe]            | :white_check_mark: | :white_check_mark: | [subscribeBuffer][1]            | :white_check_mark: |        :x:         |
| [substr]               | :white_check_mark: |        :x:         | [substrBuffer][1]               | :white_check_mark: |        :x:         |
| [sunion]               | :white_check_mark: | :white_check_mark: | [sunionBuffer][1]               | :white_check_mark: |        :x:         |
| [sunionstore]          | :white_check_mark: | :white_check_mark: | [sunionstoreBuffer][1]          | :white_check_mark: |        :x:         |
| [swapdb]               | :white_check_mark: |        :x:         | [swapdbBuffer][1]               | :white_check_mark: |        :x:         |
| [sync]                 | :white_check_mark: |        :x:         | [syncBuffer][1]                 | :white_check_mark: |        :x:         |
| [time]                 | :white_check_mark: | :white_check_mark: | [timeBuffer][1]                 | :white_check_mark: |        :x:         |
| [touch]                | :white_check_mark: |        :x:         | [touchBuffer][1]                | :white_check_mark: |        :x:         |
| [ttl]                  | :white_check_mark: | :white_check_mark: | [ttlBuffer][1]                  | :white_check_mark: |        :x:         |
| [type]                 | :white_check_mark: | :white_check_mark: | [typeBuffer][1]                 | :white_check_mark: |        :x:         |
| [unlink]               | :white_check_mark: | :white_check_mark: | [unlinkBuffer][1]               | :white_check_mark: |        :x:         |
| [unsubscribe]          | :white_check_mark: | :white_check_mark: | [unsubscribeBuffer][1]          | :white_check_mark: |        :x:         |
| [unwatch]              | :white_check_mark: |        :x:         | [unwatchBuffer][1]              | :white_check_mark: |        :x:         |
| [wait]                 | :white_check_mark: |        :x:         | [waitBuffer][1]                 | :white_check_mark: |        :x:         |
| [watch]                | :white_check_mark: |        :x:         | [watchBuffer][1]                | :white_check_mark: |        :x:         |
| [xack]                 | :white_check_mark: |        :x:         | [xackBuffer][1]                 | :white_check_mark: |        :x:         |
| [xadd]                 | :white_check_mark: | :white_check_mark: | [xaddBuffer][1]                 | :white_check_mark: |        :x:         |
| [xautoclaim]           | :white_check_mark: |        :x:         | [xautoclaimBuffer][1]           | :white_check_mark: |        :x:         |
| [xclaim]               | :white_check_mark: |        :x:         | [xclaimBuffer][1]               | :white_check_mark: |        :x:         |
| [xdel]                 | :white_check_mark: |        :x:         | [xdelBuffer][1]                 | :white_check_mark: |        :x:         |
| [xgroup]               | :white_check_mark: |        :x:         | [xgroupBuffer][1]               | :white_check_mark: |        :x:         |
| [xinfo]                | :white_check_mark: |        :x:         | [xinfoBuffer][1]                | :white_check_mark: |        :x:         |
| [xlen]                 | :white_check_mark: | :white_check_mark: | [xlenBuffer][1]                 | :white_check_mark: |        :x:         |
| [xpending]             | :white_check_mark: |        :x:         | [xpendingBuffer][1]             | :white_check_mark: |        :x:         |
| [xrange]               | :white_check_mark: | :white_check_mark: | [xrangeBuffer][1]               | :white_check_mark: |        :x:         |
| [xread]                | :white_check_mark: | :white_check_mark: | [xreadBuffer][1]                | :white_check_mark: |        :x:         |
| [xreadgroup]           | :white_check_mark: |        :x:         | [xreadgroupBuffer][1]           | :white_check_mark: |        :x:         |
| [xrevrange]            | :white_check_mark: | :white_check_mark: | [xrevrangeBuffer][1]            | :white_check_mark: |        :x:         |
| [xsetid]               | :white_check_mark: |        :x:         | [xsetidBuffer][1]               | :white_check_mark: |        :x:         |
| [xtrim]                | :white_check_mark: |        :x:         | [xtrimBuffer][1]                | :white_check_mark: |        :x:         |
| [zadd]                 | :white_check_mark: | :white_check_mark: | [zaddBuffer][1]                 | :white_check_mark: |        :x:         |
| [zcard]                | :white_check_mark: | :white_check_mark: | [zcardBuffer][1]                | :white_check_mark: |        :x:         |
| [zcount]               | :white_check_mark: | :white_check_mark: | [zcountBuffer][1]               | :white_check_mark: |        :x:         |
| [zdiff]                | :white_check_mark: |        :x:         | [zdiffBuffer][1]                | :white_check_mark: |        :x:         |
| [zdiffstore]           | :white_check_mark: |        :x:         | [zdiffstoreBuffer][1]           | :white_check_mark: |        :x:         |
| [zincrby]              | :white_check_mark: | :white_check_mark: | [zincrbyBuffer][1]              | :white_check_mark: |        :x:         |
| [zinter]               | :white_check_mark: |        :x:         | [zinterBuffer][1]               | :white_check_mark: |        :x:         |
| [zinterstore]          | :white_check_mark: | :white_check_mark: | [zinterstoreBuffer][1]          | :white_check_mark: |        :x:         |
| [zlexcount]            | :white_check_mark: |        :x:         | [zlexcountBuffer][1]            | :white_check_mark: |        :x:         |
| [zmscore]              | :white_check_mark: |        :x:         | [zmscoreBuffer][1]              | :white_check_mark: |        :x:         |
| [zpopmax]              | :white_check_mark: | :white_check_mark: | [zpopmaxBuffer][1]              | :white_check_mark: |        :x:         |
| [zpopmin]              | :white_check_mark: | :white_check_mark: | [zpopminBuffer][1]              | :white_check_mark: |        :x:         |
| [zrandmember]          | :white_check_mark: |        :x:         | [zrandmemberBuffer][1]          | :white_check_mark: |        :x:         |
| [zrange]               | :white_check_mark: | :white_check_mark: | [zrangeBuffer][1]               | :white_check_mark: |        :x:         |
| [zrangebylex]          | :white_check_mark: |        :x:         | [zrangebylexBuffer][1]          | :white_check_mark: |        :x:         |
| [zrangebyscore]        | :white_check_mark: | :white_check_mark: | [zrangebyscoreBuffer][1]        | :white_check_mark: |        :x:         |
| [zrangestore]          | :white_check_mark: |        :x:         | [zrangestoreBuffer][1]          | :white_check_mark: |        :x:         |
| [zrank]                | :white_check_mark: | :white_check_mark: | [zrankBuffer][1]                | :white_check_mark: |        :x:         |
| [zrem]                 | :white_check_mark: | :white_check_mark: | [zremBuffer][1]                 | :white_check_mark: |        :x:         |
| [zremrangebylex]       | :white_check_mark: |        :x:         | [zremrangebylexBuffer][1]       | :white_check_mark: |        :x:         |
| [zremrangebyrank]      | :white_check_mark: | :white_check_mark: | [zremrangebyrankBuffer][1]      | :white_check_mark: |        :x:         |
| [zremrangebyscore]     | :white_check_mark: | :white_check_mark: | [zremrangebyscoreBuffer][1]     | :white_check_mark: |        :x:         |
| [zrevrange]            | :white_check_mark: | :white_check_mark: | [zrevrangeBuffer][1]            | :white_check_mark: |        :x:         |
| [zrevrangebylex]       | :white_check_mark: |        :x:         | [zrevrangebylexBuffer][1]       | :white_check_mark: |        :x:         |
| [zrevrangebyscore]     | :white_check_mark: | :white_check_mark: | [zrevrangebyscoreBuffer][1]     | :white_check_mark: |        :x:         |
| [zrevrank]             | :white_check_mark: | :white_check_mark: | [zrevrankBuffer][1]             | :white_check_mark: |        :x:         |
| [zscan]                | :white_check_mark: | :white_check_mark: | [zscanBuffer][1]                | :white_check_mark: |        :x:         |
| [zscore]               | :white_check_mark: | :white_check_mark: | [zscoreBuffer][1]               | :white_check_mark: |        :x:         |
| [zunion]               | :white_check_mark: |        :x:         | [zunionBuffer][1]               | :white_check_mark: |        :x:         |
| [zunionstore]          | :white_check_mark: |        :x:         | [zunionstoreBuffer][1]          | :white_check_mark: |        :x:         |

### Commands that won't be implemented

| redis     | why it doesn't make sense to emulate                                                                         |
| --------- | :----------------------------------------------------------------------------------------------------------- |
| [debug]   | This command is intended to aid in debugging redis                                                           |
| [dump]    | Doesn't make sense to implement the internal data format used by RDB                                         |
| [hello]   | THe protocols this command is switching between (RESP2, RESP3, Redis 6) aren't in use                        |
| [latency] | ioredis-mock isn't operating over the network so there is no latency to monitor                              |
| [module]  | It's unlikely that we'll be able to run Redis Modules in a JS VM                                             |
| [restore] | The RDB specific format used for restores would be a massive undertaking to implement with very little gain. |
| [slowlog] | Useful when you're on redis, not so much when on ioredis-mock                                                |

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
[decr]: http://redis.io/commands/DECR
[decrby]: http://redis.io/commands/DECRBY
[del]: http://redis.io/commands/DEL
[discard]: http://redis.io/commands/DISCARD
[echo]: http://redis.io/commands/ECHO
[eval]: http://redis.io/commands/EVAL
[evalsha]: http://redis.io/commands/EVALSHA
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
[hexists]: http://redis.io/commands/HEXISTS
[hget]: http://redis.io/commands/HGET
[hgetall]: http://redis.io/commands/HGETALL
[hincrby]: http://redis.io/commands/HINCRBY
[hincrbyfloat]: http://redis.io/commands/HINCRBYFLOAT
[hkeys]: http://redis.io/commands/HKEYS
[hlen]: http://redis.io/commands/HLEN
[hmget]: http://redis.io/commands/HMGET
[hmset]: http://redis.io/commands/HMSET
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
[monitor]: http://redis.io/commands/MONITOR
[move]: http://redis.io/commands/MOVE
[mset]: http://redis.io/commands/MSET
[msetnx]: http://redis.io/commands/MSETNX
[object]: http://redis.io/commands/OBJECT
[persist]: http://redis.io/commands/PERSIST
[pexpire]: http://redis.io/commands/PEXPIRE
[pexpireat]: http://redis.io/commands/PEXPIREAT
[pfadd]: http://redis.io/commands/PFADD
[pfcount]: http://redis.io/commands/PFCOUNT
[pfdebug]: http://redis.io/commands/PFDEBUG
[pfmerge]: http://redis.io/commands/PFMERGE
[ping]: http://redis.io/commands/PING
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
[debug]: http://redis.io/commands/DEBUG
[dump]: http://redis.io/commands/DUMP
[hello]: http://redis.io/commands/HELLO
[latency]: http://redis.io/commands/LATENCY
[module]: http://redis.io/commands/MODULE
[restore]: http://redis.io/commands/RESTORE
[slowlog]: http://redis.io/commands/SLOWLOG
