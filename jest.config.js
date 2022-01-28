module.exports = {
  testRunner: 'jest-circus/runner',
  testMatch: ['**/test/**/*.js'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/testSetupSrc.js'],
  setupFilesAfterEnv: ['<rootDir>/testSetupAfterEnv.js'],
}
