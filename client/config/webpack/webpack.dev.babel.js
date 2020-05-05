const webpack = require('webpack');

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: paths.outputPath,
        chunkFilename: '[name].js',
    },
    module: {
        rules,
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
