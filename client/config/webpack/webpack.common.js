const webpack = require('webpack');
require('dotenv').config();
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    entry: paths.entryPath,
    output: {
        filename: paths.outputPath,
    },
    module: {
        rules,
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.ts', '.tsx', '.js', '.scss', '.css'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
                MAPBOX_STYLES: JSON.stringify(process.env.MAPBOX_STYLES),
            },
        }),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true,
            },
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
