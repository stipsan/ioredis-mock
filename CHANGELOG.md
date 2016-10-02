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

[1.13.0]: https://github.com/ungoldman/gh-release/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/ungoldman/gh-release/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/ungoldman/gh-release/compare/v1.10.0...v1.11.0
