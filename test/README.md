# What tests go where?

All tests in [/integration](integration) need to avoid using private APIs and imports. They should pass as if you were running it against `ioredis` and a live `redis server`.

While everything in [/functional](functional) are tests that could be a unit test, or otherwise test internals that isn't directly exposed in the published library.

# How to run e2e tests

You'll need an instance of redis running on localhost, on port `6379`:

```bash
$ docker run --name ioredis-mock -p 6379:6379 --rm redis redis-server --save 60 1 --loglevel warning
```

Then you can run `npm run test:e2e`
