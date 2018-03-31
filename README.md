# ioredis-mock &middot; [![CircleCI Status](https://img.shields.io/circleci/project/github/stipsan/ioredis-mock.svg?style=flat-square)](https://circleci.com/gh/stipsan/ioredis-mock) [![AppVeyor branch](https://img.shields.io/appveyor/ci/stipsan/ioredis-mock/master.svg?style=flat-square&label=win)](https://ci.appveyor.com/project/stipsan/ioredis-mock) [![npm](https://img.shields.io/npm/dm/ioredis-mock.svg?style=flat-square)](https://npm-stat.com/charts.html?package=ioredis-mock) [![npm version](https://img.shields.io/npm/v/ioredis-mock.svg?style=flat-square)](https://www.npmjs.com/package/ioredis-mock) [![Redis Compatibility: 54%](https://img.shields.io/badge/redis-54%25-yellow.svg?style=flat-square)](compat.md) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This library emulates [ioredis](https://github.com/luin/ioredis) by performing
all operations in-memory. The best way to do integration testing against redis
and ioredis is on a real redis-server instance. However, there are cases where
mocking the redis-server is a better option.

Cases like:

* Your workflow already use a local redis-server instance for the dev server.
* You're on a platform
  [without an official redis release](https://github.com/MSOpenTech/redis),
  that's even worse than using an emulator.
* You're running tests on a CI, setting it up is complicated. If you combine it
  with CI that also run selenium acceptance testing it's even more complicated,
  as two redis-server instances on the same CI build is hard.
* The GitHub repo have bots that run the testing suite and is limited through
  npm package.json install scripts and can't fire up servers. (Having
  [Greenkeeper](https://greenkeeper.io/) notifying you when a new release of
  ioredis is out and wether your code breaks or not is awesome).

Check the [compatibility table](compat.md) for supported redis commands.

## Usage ([try it in your browser](https://runkit.com/npm/ioredis-mock))

```js
var Redis = require('ioredis-mock');
var redis = new Redis({
  // `options.data` does not exist in `ioredis`, only `ioredis-mock`
  data: {
    user_next: '3',
    emails: {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2',
    },
    'user:1': { id: '1', username: 'superman', email: 'clark@daily.planet' },
    'user:2': { id: '2', username: 'batman', email: 'bruce@wayne.enterprises' },
  },
});
// Basically use it just like ioredis
```

## Roadmap

This project started off as just an utility in
[another project](https://github.com/stipsan/epic) and got open sourced to
benefit the rest of the ioredis community. This means there's work to do before
it's feature complete:

* [x] Setup testing suite for the library itself.
* [x] Refactor to bluebird promises like ioredis, support node style callback
      too.
* [x] Implement remaining basic features that read/write data.
* [x] Implement ioredis
      [argument and reply transformers](https://github.com/luin/ioredis#transforming-arguments--replies).
* [ ] Connection Events
* [ ] Offline Queue
* [ ] Pub/Sub
* [ ] Error Handling
* [ ] Implement [remaining](compat.md) commands

## I need a feature not listed here

Just create an issue and tell us all about it or submit a PR with it! :-)
