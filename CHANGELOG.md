# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.11.0] - 2018-07-18

## Added

- `zcount` command (#460 @jmelion)

## [3.10.2] - 2018-07-11

## Fixed

- Closer mock of pipeline/multi feature (#458 @BastienAr)

## [3.10.1] - 2018-06-25

## Fixed

- redis format for xread for multiple streams. (#455 @critocrito)

## [3.10.0] - 2018-06-24

## Added

- `xadd`, `xlen`, `xrange`, `xrevrange` and `xread` for stream support (#449 @critocrito)

## [3.9.1] - 2018-06-09

## Fixed

- `zrange` functions sort items with the same score in lexicographical order (#446 @kylewm)

## [3.9.0] - 2018-06-04

## Added

- `zrevrangebyscore` commands (#442 @kylewm)
- `zrem` and `zincrby` commands (#443 @kylewm)

## [3.8.3] - 2018-05-25

## Fixed

- missing case in `spop` (#433 @BastienAr)

## [3.8.2] - 2018-05-24

## Fixed

- `spop` behaviour (#432 @BastienAr)

## [3.8.1] - 2018-04-12

## Fixed

- flatten (smoosh) args correctly (#405 @BastienAr)

## [3.8.0] - 2018-04-10

## Added

- `zscanStream` and `hscanStream` commands (#393 @BastienAr)

## [3.7.1] - 2018-04-03

## Fixed

- `pexpire, pexpireat, psetex` to set correct expire time (#389 @vaskevich)

## [3.7.0] - 2018-04-01

## Added

- `scanStream` command (#363 @BastienAr)

## [3.6.4] - 2018-02-17

## Fixed

- `keys` no longer returns empty sets, just like real redis (#358)

## [3.6.3] - 2018-02-06

## Fixed

- `srandom` not using `Set`. (#356 @ianmuninio)

## [3.6.2] - 2018-02-01

## Fixed

- `del` should return number of keys deleted from the data, not the number of arguments (#355 @donaldjarmstrong)

## [3.6.1] - 2018-01-06

### Fixed

- Passing null values should not throw exceptions (#353 @kkragenbrink)

## [3.6.0] - 2018-01-03

### Added

- `zrangebyscore` command in addition to `unsubscribe` and `quit` stubs (#350 @usebaz)

## [3.5.0] - 2017-12-07

### Added

- `subscribe` command stub (#348 @yitongding)

## [3.4.2] - 2017-11-28

### Fixed

- Remove .eslintcache file from package (#347)

## [3.4.1] - 2017-11-28

### Fixed

- More detailed RunKit example (#346)

## [3.4.0] - 2017-11-27

### Added

- Argument and Reply Transformers (#342 @DrMegavolt)

## [3.3.1] - 2017-11-17

### Fixed

- [RunKit example](https://npm.runkit.com/ioredis-mock) (#340)

## [3.3.0] - 2017-11-16

### Added

- `zadd`, `zrange`, `zremrevbyrank` and `zrevrange` commands. (#321 @ddunkin)
- Added support for passing objects and maps to `hmset` (#337)

## [3.2.0] - 2017-11-15

### Added

- `lrange` command. (#335 @sseidametov)
- `scan` command. (#334 @DrMegavolt)

## [3.1.3] - 2017-11-12

### Fixes

- Fixed errors in smembers and srem when no data is set (#332)

## [3.1.2] - 2017-11-09

### Fixes

- Fixed hexists edge cases. (#331 @wraytw)

## [3.1.1] - 2017-10-19

### Fixes

- Ignore codeclimate in npm package

## [3.1.0] - 2017-10-03

### Features

- Added `pipeline` with method chaining (#312 @funnisimo)

## [3.0.2] - 2017-10-02

### Fixes

- Added back support for node v0.10.x like ioredis.

## [3.0.1] - 2017-10-02

### Fixes

- Removed README and RunKit references to old import style.

## [3.0.0] - 2017-10-02

### Changed

- Use module.exports to be in line with ioredis. (#311 @rexxars)

### Fixes

- Error thrown in sismember() if key does not exist. (#318 @theogravity)

## [2.4.1] - 2017-10-02

### Fixes

- Allow ioredis 3 as peer dependency. (#317 @aruberto)

## [2.4.0] - 2017-03-05

### Features

- `exec` supports a callback argument. (#290)

### Fixes

- Don't modify objects passed to or returned from the internal datastore. (#281
  @jeffkenney)
- Fix hash get commands for missing hashes. (#284 @jeffkenney)

## [2.3.0] - 2017-02-28

### Added

- Add event emitter inheritance. (#248 @xsellier)
- Trigger connect & ready events on instantiation. (#280 @rexxars)

### Changed

- Prevent conversion of buffer arguments to strings. (#236 @dpikt)

### Misc

- updated all dependencies to latest stable versions. (@greenkeeperio-bot)

## [2.2.0] - 2016-10-31

### Added

- buffer operation aliases. (#234 @dpikt)
- yarn lockfile.

### Changed

- updated redis-commands dependency and updated the compat table with new
  commands.

## [2.1.0] - 2016-10-05

### Added

- `smove` command. (#217)
- `sdiff` command. (#216)
- `sunion` command. (#215)
- `sinter` command. (#214)

### Changed

- added compat table badge to readme. (#213)

## [2.0.0] - 2016-10-03

Bumping the version to v2 as there are fixes in this release that are breaking
changes.

### Added

- `flushdb` command.

### Changed

- Command arguments is now transformed to strings before being passed to the
  command itself helping the mock behave more like a real ioredis client.

### Fixed

- `append` updated to return an integer.
- `dbsize` updated to return an integer.
- `decr` updated to return an integer.
- `decrby` updated to return an integer.
- `expire` updated to return an integer.
- `expireat` updated to return an integer.
- `hdel` updated to return an integer.
- `hexists` updated to return an integer.
- `hincrby` updated to return an integer.
- `hlen` updated to return an integer.
- `hset` updated to return an integer.
- `hsetnx` updated to return an integer.
- `hstrlen` updated to return an integer.
- `incr` updated to return an integer.
- `incrby` updated to return an integer.
- `lpush` updated to return an integer.
- `lpushx` updated to return an integer.
- `mget` required a single array argument, updated to use multiple arguments
  (single array support will be added later when ioredis Argument Transformers
  is properly implemented).
- `msetnx` updated to return an integer.
- `persist` updated to return an integer.
- `pexpire` updated to return an integer.
- `pexpireat` updated to return an integer.
- `pttl` updated to return an integer.
- `renamenx` updated to return an integer.
- `rpush` updated to return an integer.
- `rpushx` updated to return an integer.
- `scard` updated to return an integer.
- `setnx` updated to return an integer.
- `sismember` updated to return an integer.
- `strlen` updated to return an integer.
- `ttl` updated to return an integer.

### Deprecated

- `hmset` no longer accepts passing an object with keys and values directly.
  This will be added later when ioredis Argument Transformers is properly
  implemented.

## [1.15.0] - 2016-10-03

### Added

- `type` command (#207)

### Fixed

- `sadd` no longer allow duplicate values (#204 @kesla)
- `hset` learned to create a new hash if not existing instead of throwing error
  (#207)
- `hset` updated to return integer reply according to redis spec (#207)

### Internal

- `set` related commands (`sadd`, `scard`, etc) implemented using es6 `Set`
  instead of `Array` (#204 @kesla)
- `hset` tests refactored (#207)

## [1.14.0] - 2016-10-02

### Features

- added `scard` command (#201)
- added `discard` command (#200)

### Documentation

- added CHANGELOG.md file

## [1.13.0] - 2016-10-02

### Features

- added `mset` command (#181)
- added `msetnx` command (#182)
- added `dbsize` command (#183)
- added `lpushx` command (#184)
- added `incrbyfloat` command (#185)
- added `rpushx` command (#186)
- added `hincrbyfloat` command (#187)
- added `lpop` command (#189)
- added `rpop` command (#190)
- added `lindex` command (#191)
- added `srandmember` command (#192)
- added `lset` command (#193)

## [1.12.0] - 2016-10-02

### Features

- added `auth` command (#160)
- added `bgrewriteaof` command (#161)
- added `save` command (#162)
- added `lastsave` command (#163)
- added `bgsave` command (#164)
- added `getrange` command (#165)
- added `echo` command (#166)
- added `randomkey` command (#167)
- added `role` command (#168)
- added `flushall` command (#169)
- added `ping` command (#170)
- added `persist` command (#171)
- added `expireat` command (#172)
- added `pttl` command (#173)
- added `hkeys` command (#174)
- added `setex` command (#175)
- added `pexpireat` command (#176)
- added `hlen` command (#177)
- added `pexpire` command (#178)
- added `psetex` command (#179)

## [1.11.0] - 2016-10-01

### Features

- added `expire` command (#155)
- added `ttl` command (#157)

### Documentation

- cleaned up compat table (#158)

### Tests

- circleci now run parallel builds to distribute node v4 - v6 tests between
  containers, speeding things up a bit

## [1.10.0] - 2016-10-01

### Features

- added `renamenx` command (#152)

## [1.9.0] - 2016-09-26

### Features

- added `mget` command (#134 @kesla)

### Misc

- updated all dependencies to latest versions (thanks, @greenkeeperio-bot!)

## [1.8.0] - 2016-08-13

### Features

- added `brpoplpush` command (#106 @davemcorwin)
- added `llen` command (#106 @davemcorwin)
- added `lpush` command (#106 @davemcorwin)
- added `lrem` command (#106 @davemcorwin)
- added `publish` stub (#106 @davemcorwin)
- added `rpoplpush` command (#106 @davemcorwin)
- added `rpush` command (#106 @davemcorwin)

### Fixes

- `hmset` command supports objects (#106 @davemcorwin)
- `incr` command sets default value `'0'` if not exists (#106 @davemcorwin)

### Misc

- updated all dependencies to latest versions (thanks, @greenkeeperio-bot!)

## [1.7.0] - 2016-08-02

### Features

- added `keys` command (#92 @pivotal-csaa)

### Misc

- updated test and linting dependencies to latest versions (thanks,
  @greenkeeperio-bot!)

## [1.6.0] - 2016-07-04

### Features

- added `setnx` command

### Bugfixes

- `hsetnx` would report '0' to signal the key was a no-op but in reality did
  change the existing value.

## [1.5.0] - 2016-06-28

### Features

- added strlen command (#53)
- added hdel command (#54)
- added hexists command (#55)
- added hincrby command (#56)
- added hstrlen command (#57)

### Documentation

- Added a note about tonicdev to readme (#52)

## [1.4.1] - 2016-06-27

### Minor changes

- updated istanbul devDependency

## [1.4.0] - 2016-06-26

### Features

- added `hmget` command
- added `rename` command
- added `append` command

### Bugfixes

- performance penalties for using delete (#45)

## [1.3.0] - 2016-06-21

### Features

- added `exists` command.
- added `time` command.
- added `getset` command.

## [1.2.0] - 2016-06-16

### Features

- added incrby and decrby commands (#34).

### Documentation

- compat.md now links to redis docs for easy lookup.

## [1.1.1] - 2016-06-15

- #30 Fix regression in v1.1.0 that broke the whole module (sorry!).

## [1.1.0] - 2016-06-14

- refactored to Bluebird promises.
- node style callbacks supported, like in ioredis.
- added del and decr.

## [1.0.6] - 2016-06-14

- added [compat table](https://github.com/stipsan/ioredis-mock/compat.md).
- added npm preversion and prepublish scripts to prevent easy maintenance
  mistakes.

## [1.0.5] - 2016-06-14

- updated readme

## [1.0.4] - 2016-06-12

- 100% test coverage
- srem and sadd accepts multiple items
- added set and get commands

## [1.0.3] - 2016-06-12

- setup CircleCI to cover latest stable node releases.
- incr didn't persist changes to data.

## [1.0.2] - 2016-06-10

- Setup travis CI and AppVeyor integrations.
- Added tests for exec, hget, hset, hsetnx and incr.
- Setup coveralls and codeclimate integrations.
- Fixed broken hset implementation.

## [1.0.1] - 2016-06-09

- lodash was missing in the package.json dependencies
- fixes to documentation
- added tonicExample

## 1.0.0 - 2016-06-09

### Supported operations

- Integers
- incr
- Hashing
- hset
- hget
- hgetall
- hsetnx
- hmset
- hvals
- Lists
- sadd
- srem
- smembers
- sismember
- Transaction
- multi
- exec

[unreleased]: https://github.com/stipsan/ioredis-mock/compare/v3.11.0...HEAD
[3.11.0]: https://github.com/stipsan/ioredis-mock/compare/v3.10.2...v3.11.0
[3.10.2]: https://github.com/stipsan/ioredis-mock/compare/v3.10.1...v3.10.2
[3.10.1]: https://github.com/stipsan/ioredis-mock/compare/v3.10.0...v3.10.1
[3.10.0]: https://github.com/stipsan/ioredis-mock/compare/v3.9.1...v3.10.0
[3.9.1]: https://github.com/stipsan/ioredis-mock/compare/v3.9.0...v3.9.1
[3.9.0]: https://github.com/stipsan/ioredis-mock/compare/v3.8.3...v3.9.0
[3.8.3]: https://github.com/stipsan/ioredis-mock/compare/v3.8.2...v3.8.3
[3.8.2]: https://github.com/stipsan/ioredis-mock/compare/v3.8.1...v3.8.2
[3.8.1]: https://github.com/stipsan/ioredis-mock/compare/v3.8.0...v3.8.1
[3.8.0]: https://github.com/stipsan/ioredis-mock/compare/v3.7.1...v3.8.0
[3.7.1]: https://github.com/stipsan/ioredis-mock/compare/v3.7.0...v3.7.1
[3.7.0]: https://github.com/stipsan/ioredis-mock/compare/v3.6.4...v3.7.0
[3.6.4]: https://github.com/stipsan/ioredis-mock/compare/v3.6.3...v3.6.4
[3.6.3]: https://github.com/stipsan/ioredis-mock/compare/v3.6.2...v3.6.3
[3.6.2]: https://github.com/stipsan/ioredis-mock/compare/v3.6.1...v3.6.2
[3.6.1]: https://github.com/stipsan/ioredis-mock/compare/v3.6.0...v3.6.1
[3.6.0]: https://github.com/stipsan/ioredis-mock/compare/v3.5.0...v3.6.0
[3.5.0]: https://github.com/stipsan/ioredis-mock/compare/v3.4.2...v3.5.0
[3.4.2]: https://github.com/stipsan/ioredis-mock/compare/v3.4.1...v3.4.2
[3.4.1]: https://github.com/stipsan/ioredis-mock/compare/v3.4.0...v3.4.1
[3.4.0]: https://github.com/stipsan/ioredis-mock/compare/v3.3.1...v3.4.0
[3.3.1]: https://github.com/stipsan/ioredis-mock/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/stipsan/ioredis-mock/compare/v3.2.0...v3.3.0
[3.2.0]: https://github.com/stipsan/ioredis-mock/compare/v3.1.3...v3.2.0
[3.1.3]: https://github.com/stipsan/ioredis-mock/compare/v3.1.2...v3.1.3
[3.1.2]: https://github.com/stipsan/ioredis-mock/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/stipsan/ioredis-mock/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/stipsan/ioredis-mock/compare/v3.0.2...v3.1.0
[3.0.2]: https://github.com/stipsan/ioredis-mock/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/stipsan/ioredis-mock/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/stipsan/ioredis-mock/compare/v2.4.1...v3.0.0
[2.4.1]: https://github.com/stipsan/ioredis-mock/compare/v2.4.0...v2.4.1
[2.4.0]: https://github.com/stipsan/ioredis-mock/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/stipsan/ioredis-mock/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/stipsan/ioredis-mock/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/stipsan/ioredis-mock/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/stipsan/ioredis-mock/compare/v1.15.0...v2.0.0
[1.15.0]: https://github.com/stipsan/ioredis-mock/compare/v1.14.0...v1.15.0
[1.14.0]: https://github.com/stipsan/ioredis-mock/compare/v1.13.1...v1.14.0
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
