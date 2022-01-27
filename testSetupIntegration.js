// Redirects 'ioredis' imports to the lib files and runs the tests using only the public APIs

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('./lib/index'));
