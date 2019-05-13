module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: [
    "<rootDir>/test"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "testMatch": [
    "**/*.test.ts"
  ],
}
