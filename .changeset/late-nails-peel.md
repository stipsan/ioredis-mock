---
'ioredis-mock': patch
---

Bugfixes for LPOP command:

- add 2nd argument - `count`
- remove key when list is empty

Resolves #1316
