module.exports = [
    {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
    {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            publicPath: '/',
        },
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?prefix=font/&limit=5000',
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
    },
];
