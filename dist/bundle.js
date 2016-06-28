/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    var ControllerLogin = __webpack_require__(2);
	    var app = angular.module('app', ['ngRoute']);
	    app.config(function($routeProvider) {        
	        $routeProvider.when('/',          {            
	            templateUrl: '../templates/login.html',
	                        controller: 'controllerLogin'        
	        });        
	    });
	    app.controller('controllerLogin', ControllerLogin);
	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function($scope) {

	    $scope.user = {};

	    $scope.SignIn = function($event) {
	        $event.preventDefault();
	        fetch('http://localhost:1000/signup', {
	                method: 'post',
	                headers: {
	                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

	                },
	                mode: 'no-cors',
	                body: 'username=' + $scope.user.login + '&password=' + $scope.user.password
	            })
	            .then(function(response) {
	              console.log(response);
	            })
	            .catch(function(error) {
	                console.log('Request failed', error);
	            });
	    };
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
