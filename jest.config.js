module.exports = {
  testRunner: 'jest-circus/runner',
  testMatch: ['**/test/**/*.js'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/testSetupSrc.js'],
  setupFilesAfterEnv: ['<rootDir>/testSetupAfterEnv.js'],
  snapshotSerializers: ['jest-buffer-snapshot-serializer'],
}
