module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], // Path to your setup file
  testMatch: ['**/+(*.spec).+(ts)'], // Adjust if your spec files have a different pattern
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // This might not be necessary in all projects.  Adjust if needed.
    '^app/(.*)$': '<rootDir>/src/app/$1', //  Map 'app' to the actual source location.
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  // transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'], // Important for Angular libraries.
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|rxjs|rxjs-compat)'], 

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json', // Point to your test tsconfig
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  // Coverage reporting (optional)
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/jest', 
};
