module.exports = {
  testRunner: 'jest-circus/runner',
  testMatch: ['**/test/**/*.js'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/testSetupBabel.js'],
  setupFilesAfterEnv: ['<rootDir>/testSetupAfterEnv.js'],
};
