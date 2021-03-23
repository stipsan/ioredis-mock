'use strict';

// Redirects 'ioredis' imports to the compiled jest.js file that inlines the Command API from 'ioredis'

jest.mock('ioredis', () => {
  const Redis = jest.requireActual('./jest');

  return Redis;
});
