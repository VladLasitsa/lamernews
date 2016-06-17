var path = require('path');
var webpack = require('webpack');

module.exports = {

    context: __dirname + '/public',

    entry: {
        app: ['./scripts/app.js']
    },
    output: {
        path: __dirname + '/public/dist',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js']
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
        }]
    },

    devServer: {
        contentBase: __dirname + '/public'
    }
};