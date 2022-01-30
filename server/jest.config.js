module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    preset: 'ts-jest',
    verbose: true,
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRunner: 'jest-jasmine2',
    globalSetup: './src/utils/setup.ts',
    globalTeardown: './src/utils/teardown.ts'
};
