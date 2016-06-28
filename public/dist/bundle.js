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
	    'use strict';
	    var ControllerSignIn = __webpack_require__(2);
	    var ControllerArticles = __webpack_require__(3);
	    var ControllerHeader = __webpack_require__(4);
	    var ControllerArticle = __webpack_require__(5);
	    var ControllerUser = __webpack_require__(6);
	    var ArticlesComponent = __webpack_require__(7);
	    var ArticleItemComponent = __webpack_require__(9);
	    var HeaderComponent = __webpack_require__(11);
	    var SignInComponent = __webpack_require__(13);
	    var UserComponent = __webpack_require__(15);
	    var ArticlesFactory = __webpack_require__(17);
	    var UsersFactory = __webpack_require__(18);
	    var UsersService = __webpack_require__(19);
	
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
	        // $translateProvider.useLocalStorage();
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function($scope, $users, $rootScope, usersService) {
	  'use strict';
	    this.user = {};
	    this.error = false;
	    this.errorSign = false;
	    this.errorRegistred = false;
	    this.show = false;
	    $rootScope.$on('showSignIn', angular.bind(this, function() {
	        this.show = true;
	    }));
	
	    this.hide = function() {
	        this.show = false;
	    };
	
	    this.signIn = function() {
	        if (this.user.login !== '' && this.user.password !== '') {
	            var req = 'username='+this.user.login+'&password='+this.user.password;
	            $users.signIn(req, angular.bind(this, function(data) {
	                $scope.$apply(angular.bind(this, function() {
	                  if(angular.equals(data.status, 'OK')){
	                    usersService.setUser(data.user.username);
	                    usersService.logged(true);
	                    this.show = false;
	                  }
	                  else {
	                      this.errorSign = true;
	                      this.error = false;
	                      this.errorRegistred = false;
	                      this.user = {};
	                  }
	                }));
	                if(!this.show){
	                    $rootScope.$broadcast('userSignIn');
	                }
	
	            }));
	        } else {
	            this.error = true;
	            this.errorRegistred = false;
	            this.errorSign = false;
	            this.user = {};
	        }
	    };
	
	    this.registred = function() {
	        var login = this.user.login;
	        var password = this.user.password;
	        if (!angular.equals(login, '') && !angular.equals(password, '')) {
	            var req = 'username='+this.user.login+'&password='+this.user.password;
	            $users.createUser(req, angular.bind(this, function(data) {
	                $scope.$apply(angular.bind(this, function() {
	                  if(angular.equals(data.status, 'OK')){
	                    usersService.setUser(data.user.username);
	                    usersService.logged(true);
	                    this.show = false;
	                  }
	                  else {
	                    this.error = false;
	                    this.errorRegistred = true;
	                    this.errorSign = false;
	                    this.user = {};
	                  }
	                }));
	                if(!this.show){
	                    $rootScope.$broadcast('userSignIn');
	                }
	            }));
	        } else {
	            this.error = true;
	            this.errorRegistred = false;
	            this.errorSign = false;
	            this.user = {};
	        }
	    };
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function($scope, $articles, $location) {
	    'use strict';
	    this.articles = [];
	    this.sortType = 'date';
	    this.startIndex = 0;
	    this.tempStartIndex = 0;
	    this.count = 10;
	    $articles.getArticlesList(this.startIndex, this.count,
	      this.sortType, angular.bind(this, function(data) {
	        $scope.$apply(angular.bind(this, function() {
	            this.date(data);
	            this.articles = data.articles;
	        }));
	    }));
	
	    this.date = function (data) {
	      data.articles.forEach(function(item, index) {
	          item.date = item.date.substring(0, item.date.indexOf('T')) + ' ' +
	              item.date.substring(item.date.indexOf('T') + 1, item.date.indexOf('.'));
	      });
	    };
	
	    this.sort = function(sortType) {
	        this.sortType = sortType;
	        $articles.getArticlesList(this.startIndex, this.count,
	          sortType, angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	                this.date(data);
	                this.articles = data.articles;
	            }));
	        }));
	    };
	
	    this.randomArticle = function() {
	        $articles.getRandomArticle(angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	                if (angular.equals(data.status, 'OK')) {
	                    $location.url(data.article.link);
	                }
	
	            }));
	        }));
	    };
	
	    this.getMoreArticle = function() {
	        this.tempStartIndex = this.tempStartIndex + 10;
	        $articles.getArticlesList(this.tempStartIndex, this.count,
	          this.sortType, angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	              this.date(data);
	                data.articles.forEach(function(item, index) {
	                    this.articles.push(item);
	                });
	
	            }));
	        }));
	    };
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function($rootScope, $translate, $scope, usersService, $users) {
	    'use strict';
	
	    this.show = false;
	    this.user = usersService.isLogged();
	    this.username = usersService.getUser();
	    $rootScope.locale = $translate.proposedLanguage();
	
	    $rootScope.$on('userSignIn', angular.bind(this, function() {
	        $scope.$apply(angular.bind(this, function() {
	            this.username = usersService.getUser();
	            this.user = usersService.isLogged();
	        }));
	    }));
	
	    this.showSignIn = function() {
	        $rootScope.$broadcast('showSignIn');
	    };
	
	    this.changeLang = function(locale) {
	        $rootScope.locale = locale;
	        $translate.use($rootScope.locale);
	
	    };
	
	    this.logout = function() {
	        $users.logout(angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	                usersService.setUser('');
	                usersService.logged(false);
	                this.user = usersService.isLogged();
	                $rootScope.$broadcast('logout');
	            }));
	        }));
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function($scope, $rootScope, $articles, $location, usersService) {
	    'use strict';
	    this.articleItem = {};
	    this.comment = '';
	    this.checkUser = usersService.isLogged();
	    this.checkRating = false;
	    this.checkArticleOwner = false;
	
	
	
	    $rootScope.$on('userSignIn', angular.bind(this, function() {
	        $scope.$apply(angular.bind(this, function() {
	            this.checkUser = true;
	            this.checkRating = this.checkRatingF();
	            if (this.articleItem.authorusername === usersService.getUser()) {
	                this.checkArticleOwner = true;
	            }
	        }));
	    }));
	
	    $rootScope.$on('logout', angular.bind(this, function() {
	        $scope.$apply(angular.bind(this, function() {
	            this.checkUser = false;
	            this.checkRating = false;
	            this.checkArticleOwner = false;
	        }));
	    }));
	
	    $articles.getArticle($location.path(), angular.bind(this, function(data) {
	        $scope.$apply(angular.bind(this, function() {
	            this.articleItem = {};
	            this.date(data.article);
	            this.articleItem = data.article;
	            this.checkRating = this.checkRatingF();
	            if (this.articleItem.authorusername === usersService.getUser()) {
	                this.checkArticleOwner = true;
	            }
	        }));
	    }));
	
	    this.checkRatingF = function functionName() {
	        if (this.checkUser) {
	            return usersService.rating(this.articleItem._id);
	        } else {
	            return false;
	        }
	    };
	
	
	
	    this.remove = function() {
	        $articles.deleteArticle($location.path(),
	            angular.bind(this, function(data) {
	                $scope.$apply(angular.bind(this, function() {
	                    if (data.status === 'OK') {
	                        this.articleItem = {};
	                        $location.path('/');
	                    }
	                }));
	            }));
	    }
	
	    this.date = function(data) {
	        data.date = data.date.substring(0,
	                data.date.indexOf('T')) + ' ' +
	            data.date.substring(data.date.indexOf('T') + 1,
	                data.date.indexOf('.'));
	
	        this.dateComment(data);
	
	    };
	
	    this.dateComment = function(article) {
	        if (article.comments.length !== 0) {
	            article.comments.forEach(angular.bind(this, function(item, index) {
	                this.date(item);
	                if (item.comments.length !== 0) {
	                    this.dateComment(item);
	                } else {
	                    return;
	                }
	            }));
	        } else {
	            return;
	        }
	    };
	
	    this.incrementRating = function() {
	        var rating = +this.articleItem.rating + 1;
	        var request = {
	            rating: rating
	        };
	        usersService.setUserRating(this.articleItem._id);
	        this.checkRating = false;
	        var jsonReguest = JSON.stringify(request);
	        this.updateArticle(jsonReguest);
	    };
	
	    this.updateArticle = function functionName(jsonReguest) {
	        $articles.updateArticle(jsonReguest, $location.path(),
	            angular.bind(this, function(data) {
	                $scope.$apply(angular.bind(this, function() {
	                    this.articleItem = {};
	                    this.date(data.article);
	                    this.articleItem = data.article;
	
	                }));
	            }));
	    };
	
	    this.submitComment = function() {
	        console.log(this.comment);
	        if (this.comment !== '') {
	            var comment = {
	                comment: {
	                    text: this.comment,
	                    link: '',
	                    username: ''
	                }
	            };
	
	            var request = JSON.stringify(comment);
	            this.updateArticle(request);
	            this.comment = '';
	        } else {
	            this.error = 'Нет данных';
	        }
	
	    };
	
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function($scope, $rootScope, $users, $location, $articles, usersService) {
	    'use strict';
	
	    this.user = {};
	    this.email = '';
	    this.titleArticle = '';
	    this.hide = false;
	    this.update = false;
	    this.create = false;
	    this.checkUser = false;
	    var path = $location.path();
	    var username = path.substring(path.lastIndexOf('/'));
	
	    $rootScope.$on('userSignIn', angular.bind(this, function() {
	        $scope.$apply(angular.bind(this, function() {
	            this.checkUser = true;
	
	        }));
	    }));
	
	    $users.getUser(username, angular.bind(this, function(data) {
	        $scope.$apply(angular.bind(this, function() {
	            this.user = data.user;
	            if (this.user.username === usersService.getUser()) {
	                this.checkUser = true;
	            }
	        }));
	    }));
	
	    this.showUpdateBlock = function() {
	        this.update = true;
	        this.hide = true;
	    };
	
	    this.hideUpdateBlock = function() {
	        this.update = false;
	        this.hide = false;
	    };
	
	    this.showCreateArticleBlock = function() {
	        this.create = true;
	        this.hide = true;
	    };
	
	    this.hideCreateArticleBlock = function() {
	        this.create = false;
	        this.hide = false;
	    };
	
	    this.createArticle = function() {
	        var request = {
	            title: this.titleArticle
	        };
	        $articles.createArticle(JSON.stringify(request), angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	                if (angular.equals(data.status, 'OK')) {
	                    this.create = false;
	                    this.hide = false;
	                    this.user.articleCount++;
	                }
	            }));
	        }));
	    };
	
	    this.updateUser = function() {
	        var request = {
	            email: this.email
	        };
	        $users.updateUser(JSON.stringify(request), username, angular.bind(this, function(data) {
	            $scope.$apply(angular.bind(this, function() {
	                this.user = {};
	                this.user = data.user;
	                this.update = false;
	                this.hide = false;
	            }));
	        }));
	    };
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =  {
	  template : __webpack_require__(8),
	  controller: 'controllerArticles',
	  controllerAs: 'articlesCntr'
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <div>\r\n        <span class=\"sort-title\">{{'SORT' | translate}}</span>\r\n        <div>\r\n        <button class=\"signin-button sort-button\"\r\n          ng-click=\"articlesCntr.sort('date')\">{{'DATE' | translate}}</button>\r\n        <button class=\"signin-button sort-button\"\r\n          ng-click=\"articlesCntr.sort('rating')\">{{'RATING' | translate}}</button>\r\n        <a class=\"signin-button sort-button right\"\r\n          ng-href=\"#/articles/random\">{{'RANDOM_ARTICLE' | translate}}</a>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" ng-repeat=\"article in articlesCntr.articles\">\r\n        <div class=\"article\">\r\n            <div class=\"article-name\">{{article.title}}</div>\r\n            <div class=\"article-info\">\r\n                <a ng-href=\"#/users/{{article.authorusername}}\"\r\n                  class=\"number-listeners\">{{article.authorusername}}</a>\r\n                <div class=\"begin\">{{article.date}}</div>\r\n            </div>\r\n            <div class=\"registration\">\r\n                <a ng-href=\"#{{article.link}}\">{{'SHOW' | translate}}</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"more-courses\">\r\n    <a href=\"\" ng-click=\"articlesCntr.getMoreArticle()\">Больше статей</a>\r\n</div>\r\n";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =  {
	  template : __webpack_require__(10),
	  controller: 'controllerArticle',
	  controllerAs: 'articleCntr'
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"article\">\r\n    <div class=\"del\"  ng-show=\"articleCntr.checkArticleOwner\">\r\n        <a class=\"delete-button\" ng-click=\"articleCntr.remove()\">\r\n      {{'DELETE_ARTICLE' | translate}}</a>\r\n    </div>\r\n    <div class=\"article-name\">\r\n        <span>{{articleCntr.articleItem.title}}</span>\r\n\r\n    </div>\r\n    <div class=\"article-info\">\r\n        <div class=\"number-listeners\">\r\n            <a ng-href=\"#/users/{{articleCntr.articleItem.authorusername}}\">\r\n              {{articleCntr.articleItem.authorusername}}</a></div>\r\n        <div class=\"begin\">{{articleCntr.articleItem.date}}</div>\r\n        <div>\r\n            <a ng-click=\"articleCntr.incrementRating()\" ng-show=\"articleCntr.checkRating\">\r\n                <span class=\"fa fa-thumbs-o-up up\"></span></a>\r\n            {{articleCntr.articleItem.rating}}</div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<div class=\"title-comment\">{{'COMMENTS' | translate}}</div>\r\n<div class=\"comment\" ng-repeat=\"comment in articleCntr.articleItem.comments\">\r\n    <div class=\"author-comment\">\r\n        {{comment.username}}\r\n    </div>\r\n    <div class=\"date-comment\">\r\n        {{comment.date}}\r\n    </div>\r\n    <div class=\"text\">\r\n        {{comment.text}}\r\n    </div>\r\n</div>\r\n<div class=\"input-comment\" ng-show=\"articleCntr.checkUser\">\r\n    <div>\r\n        <textarea class=\"field-comment\" ng-model=\"articleCntr.comment\" class=\"field-input-comment\"></textarea>\r\n    </div>\r\n    <button class=\"submit-comment\" ng-click=\"articleCntr.submitComment()\">{{'SUBMIT' | translate}}</button>\r\n</div>\r\n";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =  {
	  template : __webpack_require__(12),
	  controller: 'controllerHeader',
	  controllerAs: 'headerCntr'
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"all-articles\">\r\n  <a class=\"signin-button\" ng-href=\"#/\">\r\n    <span class=\"fa fa-list\"></span>{{'ALL_ARTICLES' | translate}}</a>\r\n</div>\r\n<span class=\"title\">{{'MAIN_TITLE' | translate}}</span>\r\n<div class=\"sign-in\">\r\n  <button class=\"signin-button\" ng-click=headerCntr.showSignIn() ng-hide=\"headerCntr.user\">\r\n    <span class=\"fa fa-sign-in\"></span>{{'SIGN_IN' | translate}}\r\n  </button>\r\n\r\n  <div class=\"user\" ng-show=\"headerCntr.user\">\r\n    <a ng-href=\"#/users/{{headerCntr.username}}\">{{headerCntr.username}}</a>\r\n  </div>\r\n  <button class=\"signin-button fix\" ng-click=headerCntr.logout() ng-show=\"headerCntr.user\">\r\n    {{'LOGOUT' | translate}}<span class=\"fa fa-sign-out\"></span>\r\n  </button>\r\n  <div class=\"location\">\r\n    <a href=\"\" ng-click=\"headerCntr.changeLang('en')\">EN</a>\r\n    <div class=\"separator\"></div>\r\n    <a href=\"\" ng-click=\"headerCntr.changeLang('ru')\">RU</a>\r\n  </div>\r\n</div>\r\n";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =  {
	  template : __webpack_require__(14),
	  controller: 'controllerSignIn',
	  controllerAs: 'signInCntr'
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div ng-show=\"signInCntr.show\">\r\n    <a class=\"overlay\" ng-click=\"signInCntr.hide()\"></a>\r\n    <div class=\"regestration-window\">\r\n        <form class=\"form\">\r\n            <div class=\"error\" ng-show=\"signInCntr.error\">{{'ERROR' | translate}}</div>\r\n            <div class=\"error\" ng-show=\"signInCntr.errorSign\">{{'ERROR_SIGN' | translate}}</div>\r\n            <div class=\"error\" ng-show=\"signInCntr.errorRegistred\">{{'ERROR_REGISTRED' | translate}}</div>\r\n            <input ng-model=\"signInCntr.user.login\" class=\"input-field\"\r\n              placeholder=\"{{'INPUT_LOGIN' | translate}}\" type=\"text\">\r\n            <input ng-model=\"signInCntr.user.password\" ng-model-options=\"{ getterSetter: true }\"\r\n              class=\"input-field\" placeholder=\"{{'INPUT_PASSWORD' | translate}}\" type=\"password\">\r\n\r\n            <button ng-click=\"signInCntr.signIn()\" class=\"signin-button submit\" type=\"submit\">\r\n              {{'SIGN_IN' | translate}}</button>\r\n            <div class=\"or\"><span>{{'OR' | translate}}</span></div>\r\n            <button class=\"signin-button submit\" ng-click=\"signInCntr.registred()\"\r\n            type=\"submit\">{{'SIGN_UP' | translate}}</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =  {
	  template : __webpack_require__(16),
	  controller: 'controllerUser',
	  controllerAs: 'userCntr'
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"profile\" ng-hide=\"userCntr.hide\">\r\n    <span></span>\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <div class=\"student-login\">\r\n                <div class=\"user-icon\"></div>\r\n            </div>\r\n            <span>{{userCntr.user.username}}</span>\r\n            <a ng-show=\"userCntr.checkUser\" class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.showUpdateBlock()\">\r\n        {{'EDIT' | translate}}</a>\r\n            <a ng-show=\"userCntr.checkUser\" class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.showCreateArticleBlock()\">\r\n          {{'CREATE' | translate}}</a>\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_EMAIL' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.email}}</div>\r\n        </div>\r\n        <div ng-show=\"userCntr.checkUser\" class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_COMMENT_COUNT' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.commentCount}}</div>\r\n        </div>\r\n        <div ng-show=\"userCntr.checkUser\" class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_ARTICLE_COUNT' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.articleCount}}</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"update-profile\" ng-show=\"userCntr.update\">\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <!-- <div class=\"student-login\"><div class=\"user-icon\"></div></div> -->\r\n            <span>{{userCntr.user.username}}</span>\r\n            <a class=\"signin-button cancel-button\" ng-click=\"userCntr.hideUpdateBlock()\">\r\n              {{'CANCEL' | translate}}</a>\r\n            <a class=\"signin-button update-button\" ng-click=\"userCntr.updateUser()\">\r\n              {{'SAVE'| translate}}</a>\r\n\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">\r\n                <label for=\"email\">Email</label>\r\n            </div>\r\n            <input ng-model=\"userCntr.email\" type=\"text\"\r\n              class=\"value-info text-info field-input\"\r\n              placeholder=\"{{'INPUT_EMAIL' | translate}}\" id=\"email\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"update-profile\" ng-show=\"userCntr.create\">\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <a class=\"signin-button cancel-button\"\r\n              ng-click=\"userCntr.hideCreateArticleBlock()\">{{'CANCEL' | translate}}</a>\r\n            <a class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.createArticle()\">{{'CREATE'| translate}}</a>\r\n\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">\r\n                <label for=\"email\">{{'INPUT_TITLE_ARTICLE' | translate}}</label>\r\n            </div>\r\n            <input ng-model=\"userCntr.titleArticle\"\r\n              type=\"text\" class=\"value-info text-info field-input\"\r\n              placeholder=\"{{'INPUT_TITLE_ARTICLE' | translate}}\" id=\"email\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function() {
	    'use strict';
	    return {
	
	
	        getArticlesList: function(startIndex, count, typeSort, callback) {
	            fetch('/api/articles/' + startIndex + '/' +
	                    count + '?sort=' + typeSort)
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        getArticle: function(link, callback) {
	            fetch(`/api${link}`)
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        getRandomArticle: function(callback) {
	            fetch('/api/articles/random')
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        createArticle: function(request, callback) {
	            fetch('/api/articles', {
	                    method: 'POST',
	                    headers: {
	                        "Content-type": "application/json; charset=UTF-8"
	                    },
	                    credentials: 'include',
	                    body: request
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        updateArticle: function(request, link, callback) {
	            fetch(`/api${link}`, {
	                    method: 'PUT',
	                    headers: {
	                        "Content-type": "application/json; charset=UTF-8"
	                    },
	                    credentials: 'include',
	                    body: request
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        deleteArticle: function(link, callback) {
	            fetch(`/api${link}`, {
	                    method: 'DELETE',
	                    credentials: 'include',
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        }
	    };
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function($http) {
	    'use strict';
	    return {
	
	        signIn: function(request, callback) {
	            fetch('/api/signup', {
	                    method: 'POST',
	                    headers: {
	                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	                    },
	                    credentials: 'include',
	                    body: request
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	
	        },
	
	        getUser: function(username, callback) {
	            fetch('/api/users' + username, {
	                    credentials: 'include'
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        createUser: function(request, callback) {
	            fetch('/api/register', {
	                    method: 'POST',
	                    headers: {
	                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	                    },
	                    credentials: 'include',
	                    body: request
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        updateUser: function(request, username, callback) {
	            fetch('/api/users' + username, {
	                    method: 'PUT',
	                    headers: {
	                        "Content-type": "application/json; charset=UTF-8"
	                    },
	                    credentials: 'include',
	                    body: request
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        },
	
	        logout : function (callback) {
	          fetch('/api/logout', {
	                  credentials: 'include'
	              })
	              .then(function(response) {
	                  return response.json();
	              }).then(function(json) {
	                  callback(json);
	              })
	              .catch(function(error) {
	                  console.log('Request failed', error);
	              });
	        },
	
	        deleteUser: function(username, callback) {
	            fetch('/api/users' + username, {
	                    method: 'DELETE',
	                    credentials: 'include'
	                })
	                .then(function(response) {
	                    return response.json();
	                }).then(function(json) {
	                    callback(json);
	                })
	                .catch(function(error) {
	                    console.log('Request failed', error);
	                });
	        }
	    };
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function() {
	    var user = '';
	    var auth = false;
	    var usersRating = [];
	
	    this.setUserRating = function(id) {
	        usersRating.push(id);
	    };
	
	    this.rating = function(id) {
	        var check = true;
	        usersRating.forEach(function(item, index) {
	          console.log(item+",  "+ id);
	            if (item === id) {
	                check = false;
	            }
	        });
	        if (check) {
	            return true;
	        } else {
	            return false;
	        }
	
	    };
	
	    this.setUser = function(username) {
	        user = username;
	    };
	
	    this.getUser = function() {
	        return user;
	    };
	
	    this.logged = function(bool) {
	        auth = bool;
	    };
	
	    this.isLogged = function() {
	        return auth;
	    };
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map