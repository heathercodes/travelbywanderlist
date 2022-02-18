module.exports = {
    roots: ['<rootDir>'],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    preset: 'ts-jest',
    verbose: true,
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRunner: 'jest-jasmine2'
};
