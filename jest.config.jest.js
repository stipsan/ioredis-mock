module.exports = {
  ...require('./jest.config'),
  // eslint-disable-next-line global-require
  setupFiles: ['<rootDir>/testSetupJest.js'],
};
