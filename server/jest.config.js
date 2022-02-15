module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    setupFilesAfterEnv: ['jest-extended'],
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    globalSetup: '<rootDir>/tests/setup.ts',
    globalTeardown: '<rootDir>/tests/teardown.ts'
};
