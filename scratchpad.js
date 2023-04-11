// Ways to skip

// @TODO Skipped because there's a bug in our implementation
;(process.env.IS_E2E ? describe : describe.skip)
// @TODO Rewrite test suite so it runs on a real Redis instance
;(process.env.IS_E2E ? describe.skip : describe)
// @TODO Skipped because there's a bug in our implementation
;(process.env.IS_E2E ? it : it.skip)
// @TODO Rewrite test so it runs on a real Redis instance
;(process.env.IS_E2E ? it.skip : it)
