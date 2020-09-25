const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: paths.outputPath,
        chunkFilename: '[name].js',
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 450000,
        maxEntrypointSize: 8500000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                pathRewrite: { '^/api': '' },
            },
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};
