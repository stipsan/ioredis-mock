// Runs the integration test suite with the browser.js file that is intended to run in a browser env

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testEnvironment: 'jsdom',
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupBrowser.js'],
};
