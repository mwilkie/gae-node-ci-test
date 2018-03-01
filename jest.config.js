module.exports = {
  moduleNameMapper: {
    '^.*[.](css|CSS|scss|SCSS)$': '<rootDir>/jest/stub'
  },
  setupFiles: ['<rootDir>/jest/shims.js', '<rootDir>/jest/setup.js'],
  testPathIgnorePatterns: ['/node_modules/']
};
