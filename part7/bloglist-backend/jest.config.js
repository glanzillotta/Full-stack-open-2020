export default async () => {
  return {
    verbose: true,
    testEnvironment: 'node',
    rootDir: 'test',
    testPathIgnorePatterns: ['test/test.js']
  }
}