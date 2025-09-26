---
"ioredis-mock": minor
---

Update Redis Docker tag to v8.2.1 and internal Redis version data

- Updated CI workflows to use Redis 8.2.1 for end-to-end testing
- Updated internal Redis version data files from Redis 8.2.1
- Fixed XREAD command error message to match Redis v8 behavior (added '+' option)
- Updated test snapshots to reflect Redis 8.2.1 version information

This is a minor version bump as the core functionality remains compatible, with only cosmetic changes to version strings and one minor error message update.