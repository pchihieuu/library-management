import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/*.d.ts',
  ],
};

export default config;
