module.exports = {
    diff: true,
    extension: ['js', 'jsx'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    spec: "src/**/__tests__/**/*.js",
    recursive: true
}
