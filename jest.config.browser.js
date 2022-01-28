// Runs the integration test suite with the browser.js file that is intended to run in a browser env

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  testEnvironment: 'jsdom',
  testMatch: ['**/test/integration/**/*.js'],
  setupFiles: ['<rootDir>/testSetupBrowser.js'],
  // @TODO tests need a rewrite before we can run them on browser.js (stream-mock is incompatible)
  testPathIgnorePatterns: [
    'test/integration/commands/hscanStream.js',
    'test/integration/commands/zscanStream.js',
    'test/integration/commands/sscanStream.js',
    'test/integration/commands/scanStream.js',
    'test/integration/keyprefix.js',
  ],
}
