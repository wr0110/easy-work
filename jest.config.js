module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.(ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!~/.*)'],
}
