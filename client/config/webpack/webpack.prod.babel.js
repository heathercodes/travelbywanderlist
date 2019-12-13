const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].[hash].js`,
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js',
    },
    module: {
        rules,
    },
    plugins: [
        new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
            root: paths.root,
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    devtool: 'source-map',
};
