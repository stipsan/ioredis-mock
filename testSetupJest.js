// Redirects 'ioredis' imports to the compiled jest.js file that inlines the Command API from 'ioredis'

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('./jest'));
