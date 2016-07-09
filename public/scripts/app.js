(function() {
  //karma and jasmine unit-test
  //юзать less вместо css
  //поработать с sql, новую ветку с sql и оставить mongoose
    'use strict';
    var ControllerSignIn = require('./controllers/controllerSignIn');
    var ControllerArticles = require('./controllers/controllerArticles');
    var ControllerHeader = require('./controllers/controllerHeader');
    var ControllerArticle = require('./controllers/controllerArticle');
    var ControllerUser = require('./controllers/controllerUser');
    var ArticlesComponent = require('./components/articles.component');
    var ArticleItemComponent = require('./components/articleItem.component');
    var HeaderComponent = require('./components/header.component');
    var SignInComponent = require('./components/signIn.component');
    var UserComponent = require('./components/user.component');
    var ArticlesFactory = require('./factories/articles.Factory');
    var UsersFactory = require('./factories/users.Factory');
    var UsersService = require('./services/users.Service');

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
            }    
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
            }    
        }); 
        $stateProvider.state('user', {            
            url: '/users/:username',
            views: {
                'header': {
                    template: '<header></header>'
                },
                'content': {
                    template: '<user></user>'
                }
            }    
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


    app.component('header', HeaderComponent);
    app.component('signin', SignInComponent);
    app.component('articles', ArticlesComponent);
    app.component('articleitem', ArticleItemComponent);
    app.component('user', UserComponent);

    app.controller('controllerUser', ControllerUser);
    app.controller('controllerHeader', ControllerHeader);
    app.controller('controllerSignIn', ControllerSignIn);
    app.controller('controllerArticles', ControllerArticles);
    app.controller('controllerArticle', ControllerArticle);

})();
