// Karma configuration
// Generated on Mon Jul 11 2016 10:10:34 GMT+0300 (Беларусь (зима))
var webpack = require("webpack");

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [

            './node_modules/angular/angular.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './node_modules/angular-translate/dist/angular-translate.min.js',
            './public/scripts/libs/angular-translate-loader-static-files.js',
            './public/scripts/libs/angular-translate-storage-local.min.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './public/dist/bundle.js',
            "./public/scripts/**/*.spec.js"

        ],

        exclude: [],

        preprocessors: {
            'public/dist/bundle.js': ['webpack'],
        },

        webpack: {
            resolve: {
                extensions: ["", ".js", ".html"]
            },
            module: {
                loaders: [{
                    test: /\.html$/,
                    loader: "html-loader"
                }, ]
            }
        },

        reporters: ['spec'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,


        autoWatch: true,


        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    })
}
