/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  verbose: true,
  preset: 'ts-jest',
  onlyChanged: false,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'app.ts',
    'routers',
    '.mongo.models.ts',
    'src/config.ts',
  ],
};
