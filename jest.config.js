
module.exports = {

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  collectCoverageFrom: [
    '**/src/**/*.js',
    '!<rootDir>/src/main/**'
  ],

  preset: '@shelf/jest-mongodb'
}
