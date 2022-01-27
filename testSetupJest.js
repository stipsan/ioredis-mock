// This is just to ensure the legacy bc doesn't accidentally break, as the jest.js won't be removed until v7
jest.mock('ioredis', () => require('ioredis-mock/jest'));
