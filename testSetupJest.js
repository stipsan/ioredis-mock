// This is just to ensure the legacy bc doesn't accidentally break, as the jest.js won't be removed until v7
// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('./jest'));
