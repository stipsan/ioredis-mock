module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupRedis.js'],
};
