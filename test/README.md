# What tests goes where?

All tests in [/integration](/integration) needs to avoid using private APIs and imports. They should pass as if you were running it against `ioredis` and a live `redis server`.

While everything in [/functional](/functional) are tests that could be a unit test, or otherwise test internals that aren't directly exposed in the published library.
