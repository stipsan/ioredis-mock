# ioredis-mock change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Documentation
- added CHANGELOG.md file

## [1.13.0] - 2016-10-02

### Features

* added `mset` command (#181)
* added `msetnx` command (#182)
* added `dbsize` command (#183)
* added `lpushx` command (#184)
* added `incrbyfloat` command (#185)
* added `rpushx` command (#186)
* added `hincrbyfloat` command (#187)
* added `lpop` command (#189)
* added `rpop` command (#190)
* added `lindex` command (#191)
* added `srandmember` command (#192)
* added `lset` command (#193)

## [1.12.0] - 2016-10-02

### Features

* added `auth` command (#160)
* added `bgrewriteaof` command (#161)
* added `save` command (#162)
* added `lastsave` command (#163)
* added `bgsave` command (#164)
* added `getrange` command (#165)
* added `echo` command (#166)
* added `randomkey` command (#167)
* added `role` command (#168)
* added `flushall` command (#169)
* added `ping` command (#170)
* added `persist` command (#171)
* added `expireat` command (#172)
* added `pttl` command (#173)
* added `hkeys` command (#174)
* added `setex` command (#175)
* added `pexpireat` command (#176)
* added `hlen` command (#177)
* added `pexpire` command (#178)
* added `psetex` command (#179)

## [1.11.0] - 2016-10-01

### Features
* added `expire` command (#155)
* added `ttl` command (#157)

### Documentation
* cleaned up compat table (#158)

### Tests
* circleci now run parallel builds to distribute node v4 - v6 tests between containers, speeding things up a bit

## [1.10.0] - 2016-10-01

### Features

* added `renamenx` command (#152)

## [1.9.0] - 2016-09-26

### Features

* added `mget` command (#134 @kesla)

### Misc

* updated all dependencies to latest versions (thanks, @greenkeeperio-bot!)

## [1.8.0] - 2016-08-13

### Features

* added `brpoplpush` command (#106 @davemcorwin)
* added `llen ` command (#106 @davemcorwin)
* added `lpush ` command (#106 @davemcorwin)
* added `lrem ` command (#106 @davemcorwin)
* added `publish ` stub (#106 @davemcorwin)
* added `rpoplpush ` command (#106 @davemcorwin)
* added `rpush ` command (#106 @davemcorwin)

### Fixes

* `hmset` command supports objects (#106 @davemcorwin)
* `incr` command sets default value `'0'` if not exists  (#106 @davemcorwin)

### Misc

* updated all dependencies to latest versions (thanks, @greenkeeperio-bot!)

## [1.7.0] - 2016-08-02

### Features

* added `keys` command (#92 @pivotal-csaa)

### Misc

* updated test and linting dependencies to latest versions (thanks, @greenkeeperio-bot!)

## [1.6.0] - 2016-07-04

### Features

* added `setnx` command

### Bugfixes

* `hsetnx` would report '0' to signal the key was a no-op but in reality did change the existing value.

## [1.5.0] - 2016-06-28

### Features

* added strlen command (#53)
* added hdel command (#54)
* added hexists command (#55)
* added hincrby command (#56)
* added hstrlen command (#57)

### Documentation

* Added a note about tonicdev to readme (#52)

## [1.4.1] - 2016-06-27

### Minor changes

* updated istanbul devDependency

## [1.4.0] - 2016-06-26

### Features

* added `hmget` command
* added `rename` command
* added `append` command

### Bugfixes

* performance penalties for using delete (#45)

## [1.3.0] - 2016-06-21

### Features

* added `exists` command.
* added `time` command.
* added `getset` command.

## [1.2.0] - 2016-06-16

### Features

* added incrby and decrby commands (#34).

### Documentation

* compat.md now links to redis docs for easy lookup.

## [1.1.1] - 2016-06-15

* #30 Fix regression in v1.1.0 that broke the whole module (sorry!).

## [1.1.0] - 2016-06-14

* refactored to Bluebird promises.
* node style callbacks supported, like in ioredis.
* added del and decr.

## [1.0.6] - 2016-06-14

* added [compat table](https://github.com/stipsan/ioredis-mock/compat.md).
* added npm preversion and prepublish scripts to prevent easy maintenance mistakes.

## [1.0.5] - 2016-06-14

* updated readme

## [1.0.4] - 2016-06-12

* 100% test coverage
* srem and sadd accepts multiple items
* added set and get commands

## [1.0.3] - 2016-06-12

* setup CircleCI to cover latest stable node releases.
* incr didn't persist changes to data.

## [1.0.2] - 2016-06-10

* Setup travis CI and AppVeyor integrations.
* Added tests for exec, hget, hset, hsetnx and incr.
* Setup coveralls and codeclimate integrations.
* Fixed broken hset implementation.

## [1.0.1] - 2016-06-09

* lodash was missing in the package.json dependencies
* fixes to documentation
* added tonicExample

## [1.0.0] - 2016-06-09

### Supported operations

* Integers
 * incr
* Hashing
 * hset
 * hget
 * hgetall
 * hsetnx
 * hmset
 * hvals
* Lists
 * sadd
 * srem
 * smembers
 * sismember
* Transaction
 * multi
 * exec

[1.13.0]: https://github.com/stipsan/ioredis-mock/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/stipsan/ioredis-mock/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/stipsan/ioredis-mock/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/stipsan/ioredis-mock/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/stipsan/ioredis-mock/compare/v1.8.3...v1.9.0
[1.8.0]: https://github.com/stipsan/ioredis-mock/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/stipsan/ioredis-mock/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/stipsan/ioredis-mock/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/stipsan/ioredis-mock/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/stipsan/ioredis-mock/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/stipsan/ioredis-mock/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/stipsan/ioredis-mock/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/stipsan/ioredis-mock/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/stipsan/ioredis-mock/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/stipsan/ioredis-mock/compare/v1.0.6...v1.1.0
[1.0.6]: https://github.com/stipsan/ioredis-mock/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/stipsan/ioredis-mock/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/stipsan/ioredis-mock/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/stipsan/ioredis-mock/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/stipsan/ioredis-mock/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/stipsan/ioredis-mock/compare/v1.0.0...v1.0.1
