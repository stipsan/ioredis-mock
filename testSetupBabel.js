// Redirects 'ioredis' imports to the src files and lets babel-jest transpile them as needed

jest.mock('ioredis', () => require('ioredis-mock'));
