import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset to transpile TypeScript
  testEnvironment: 'node', // Specify the test environment as Node.js
  testMatch: ['**/*.test.ts'], // Match all files ending with .test.ts
  moduleFileExtensions: ['js', 'ts'], // Recognize .js and .ts files
  testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules folder
  globals: {
    'ts-jest': {
      isolatedModules: true, // Speed up tests by isolating TypeScript compilation
    },
  },
};

export default config;
