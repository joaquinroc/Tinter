module.exports = {
    moduleFileExtensions: [
      'js',
      'json',
      'ts'
    ],
    rootDir: '.',
    testRegex: 'test/.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: [
      'src/**/*.(t|j)s'
    ],
    coverageDirectory: '../coverage',
    coverageReporters: ['text', 'lcov'],
    testEnvironment: 'node',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    testPathIgnorePatterns: [
      '/node_modules/',
      '.*\\.module\\.ts$',
      '.*\\.schema\\.ts$',
      'main\\.ts$'
    ],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '.*\\.module\\.ts$',
      '.*\\.schema\\.ts$',
      'main\\.ts$'
    ]
  };
  