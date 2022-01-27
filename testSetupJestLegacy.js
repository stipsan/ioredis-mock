// Runs the integration test suite on the deprecated legacy jest.js entrypoint
// It does so by aliacing `import Redis from 'ioredis'` to `import Redis from 'ioredis-mock/jest'`

// eslint-disable-next-line global-require, import/no-unresolved
jest.mock('ioredis', () => require('./jest'));
