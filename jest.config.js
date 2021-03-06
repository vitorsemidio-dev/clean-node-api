
module.exports = {

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  collectCoverageFrom: [
    '**/src/**/*.js',
    '!<rootDir>/src/main/index.js'
  ],

  preset: '@shelf/jest-mongodb'
}
