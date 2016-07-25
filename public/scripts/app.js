(function() {
    'use strict';
    var ArticlesFactory = require('./factories/articles.Factory');
    var UsersFactory = require('./factories/users.Factory');
    var UsersService = require('./services/users.Service');
    var mainStyle = require('../styles/main.less');

    var app = angular.module('app', ['ui.router', 'pascalprecht.translate']);
    app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {        
        $stateProvider.state('articles', {            
            url: '/articles',
            views: {
                'header': {
                    template: '<header></header>'
                },
                'content': {
                    template: '<articles></articles>'
                },
                'signin': {
                    template: '<signin></signin>'
                }
            },
             
            css: mainStyle  
        }); 
        $stateProvider.state('articleItem', {            
            url: '/articles/:id',
            views: {
                'header': {
                    template: '<header></header>'
                },
                'content': {
                    template: '<articleitem></articleitem>'
                },
                'signin': {
                    template: '<signin></signin>'
                }
            },
             
            css: mainStyle    
        }); 
        $stateProvider.state('user', {            
            url: '/users/:username',
            views: {
                'header': {
                    template: '<header></header>'
                },
                'content': {
                    template: '<user></user>'
                },
                'signin': {
                    template: '<signin></signin>'
                }
            },
             
            css: mainStyle    
        }); 
        $translateProvider.useStaticFilesLoader({
            prefix: 'resource/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $urlRouterProvider.otherwise('/articles');
    });

    app.service('usersService', UsersService);

    app.factory('$articles', ArticlesFactory);
    app.factory('$users', UsersFactory);

    require('./components/articleItem/articleItem.component')(app);
    require('./components/articles/articles.component')(app);
    require('./components/header/header.component')(app);
    require('./components/user/user.component')(app);
    require('./components/signIn/signIn.component')(app);
    var scroll = require('./scroll')(window);

})();
