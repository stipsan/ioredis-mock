// Redirects 'ioredis' imports to the compiled jest.js file that inlines the Command API from 'ioredis'

// eslint-disable-next-line global-require, import/no-unresolved
jest.mock('ioredis', () => {
  const { Command } = jest.requireActual('ioredis');
  const Redis = jest.requireActual('./jest');

  return {
    __esModule: true,
    Command,
    default: Redis,
  };
});
