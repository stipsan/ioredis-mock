// Runs the integration test suite on the generated lib code rather than on src/index.js to detect errors in the build setup
// And also helps detect tests that should pass using only externally available APIs

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupLib.js'],
};
