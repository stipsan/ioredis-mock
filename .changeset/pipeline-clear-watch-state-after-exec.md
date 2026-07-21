---
"ioredis-mock": patch
---

Fix `Pipeline.exec()` not clearing watch state after a successful `MULTI/EXEC`. In real Redis, `EXEC` always clears `WATCH` state regardless of outcome. Previously, the pipeline's own commands would re-dirty the connection during execution, causing all subsequent `MULTI/EXEC` calls to incorrectly return `null`. Watch state handling is now scoped to `MULTI` transactions only — regular pipelines (`redis.pipeline()`) no longer check or clear watch state.
