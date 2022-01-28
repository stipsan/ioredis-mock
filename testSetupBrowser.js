// Runs the integration test suite using the browser.js file that is intended to run in a browser env
// We are doing so in a node env atm so there are edge cases where this would cause false positives
// and allow new releases to introduce breaking changes in a browser env that this test suite wouldn't catch
// @TODO run the test suite in an actual browser env, not a node env

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
jest.mock('ioredis', () => require('./browser'))
