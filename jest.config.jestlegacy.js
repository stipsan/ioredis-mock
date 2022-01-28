// Runs the integration test suite on the deprecated legacy jest.js entrypoint

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupJestLegacy.js'],
};
