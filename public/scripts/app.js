(function() {
    var ControllerLogin = require('./controllerLogin');
    var app = angular.module('app', ['ngRoute']);
    app.config(function($routeProvider) {        
        $routeProvider.when('/',          {            
            templateUrl: '../templates/login.html',
                        controller: 'controllerLogin'        
        });        
    });
    app.controller('controllerLogin', ControllerLogin);
})();
