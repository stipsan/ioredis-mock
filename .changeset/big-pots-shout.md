---
"ioredis-mock": major
---

Add support for `ioredis@v6` (#1499)

The `ioredis` peer dependency range is widened to `^5 || ^6`, and the test suite now runs against ioredis v6. Reply transformers are invoked with the RESP2/legacy context that ioredis v6 expects, while remaining compatible with v5.

BREAKING CHANGE: Node.js 20 or newer is now required, matching `ioredis@v6`. If you're on an older Node.js version, stay on `ioredis-mock@v8` with `ioredis@v5`.
