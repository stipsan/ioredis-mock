// Redirects 'ioredis' imports to the src files and lets babel-jest transpile them as needed

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('./src/index'));
