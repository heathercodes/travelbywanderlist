const webpack = require('webpack');

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    mode: 'development',
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
        assetFilter: (assetFilename) => {
            return (
                assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            );
        },
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
    // devtool: 'inline-source-map'
};
