// jest.config.js
module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for Angular testing
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files (if needed)
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat these extensions as ES modules
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@angular)'], // Allow transformation of Angular packages
  // setupFilesAfterEnv: ['<rootDir>/setupJest.ts'], // Optional: Setup file for Jest
  // ... existing config ...
};
