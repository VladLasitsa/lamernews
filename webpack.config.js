var path = require('path');
var webpack = require('webpack');

module.exports = {

    context: path.join(__dirname, 'public'),

    entry: {
        app: './scripts/app.js'
    },
    output: {
        path: __dirname + '/public/dist',
        publicPath: './dist/',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.html', '.css']
    },

    module: {
        preLoaders: [{
            test: /.js?$/,
            loader: 'jshint-loader',
            exclude: /node_modules/,
        }],
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack'
            ]
        }]
    },
};
