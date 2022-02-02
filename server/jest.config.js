module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    setupFilesAfterEnv: ['jest-extended'],
    preset: 'ts-jest',
    verbose: true,
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRunner: 'jest-jasmine2',
    globalSetup: '<rootDir>/tests/setup.ts',
    globalTeardown: '<rootDir>/tests/teardown.ts'
};
