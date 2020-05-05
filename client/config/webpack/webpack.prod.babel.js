const BrotliPlugin = require('brotli-webpack-plugin');

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js',
    },
    module: {
        rules,
    },
    externals: {
        mapbox: 'mapbox-gl',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};
