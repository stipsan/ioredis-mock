module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  setupFiles: ['<rootDir>/testSetupJest.js'],
};
