'use strict';

// Redirects 'ioredis' imports to the src files and lets babel-jest transpile them as needed

jest.mock('ioredis', () => {
  const { Command } = jest.requireActual('ioredis');
  const RedisMock = jest.requireActual('./src/index');

  return {
    __esModule: true,
    Command,
    default: RedisMock,
  };
});
