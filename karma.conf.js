// Karma configuration
// Generated on Mon Jul 11 2016 10:10:34 GMT+0300 (Беларусь (зима))
var webpack = require("webpack");

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            // "./test/front-end/test.config.js",
            './node_modules/angular/angular.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './node_modules/angular-translate/dist/angular-translate.min.js',
            './public/scripts/libs/angular-translate-loader-static-files.js',
            './public/scripts/libs/angular-translate-storage-local.min.js',

            // './public/scripts/libs/*.*.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './public/dist/bundle.js',
            "./test/front-end/**/*.spec.js"
            //  {
            //     pattern: 'node_modules/angular/angular.js',
            //     included: false
            // }, {
            //     pattern: 'node_modules/angular-ui-router/release/angular-ui-router.js',
            //     included: false
            // }, {
            //     pattern: 'node_modules/angular-mocks/angular-mocks.js',
            //     included: false
            // }, {
            //     pattern: 'public/dist/bundle.js',
            //     included: false
            // }, {
            //     pattern: "test/front-end/**/*.spec.js",
            //     included: false
            // }



        ],

        exclude: [],

        preprocessors: {
            'public/dist/bundle.js': ['webpack'],
            // 'test/front-end/**/*.spec.js': ['webpack']
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
