import type { Config } from 'jest';

const config: Config = {
    // Use ts-jest to compile TypeScript files
    preset: 'ts-jest',

    // Set up the testing environment to mock a browser window (required for React Testing Library)
    testEnvironment: 'jest-environment-jsdom',

    // Look for test files inside __tests__ or anywhere with .test.ts/tsx extensions
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

    // Map path aliases if you use them (e.g., matching your tsconfig paths)
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // Clear mock states automatically between every single test execution
    clearMocks: true,
};

export default config;