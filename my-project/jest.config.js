module.exports = {
  testEnvironment: 'node',  // مش jsdom لأن عندك Node.js code
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.test.js']
};