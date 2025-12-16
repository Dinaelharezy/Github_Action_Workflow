module.exports = {
  testEnvironment: 'jsdom',  // مش jsdom لأن عندك Node.js code
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.test.js']
  
};