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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';
	    var ArticlesFactory = __webpack_require__(1);
	    var UsersFactory = __webpack_require__(2);
	    var UsersService = __webpack_require__(3);
	     var mainStyle = __webpack_require__(4);
	
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
	
	    __webpack_require__(8)(app);
	    __webpack_require__(13)(app);
	    __webpack_require__(16)(app);
	    __webpack_require__(21)(app);
	    __webpack_require__(27)(app);
	
	
	})();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function($http, $location) {
	    'use strict';
	    return {
	
	
	        getArticlesList: function(startIndex, count, typeSort, callback) {
	            $http.get('/api/articles/' + startIndex + '/' +
	                    count + '?sort=' + typeSort)
	                .then(function(response) {
	                    callback(response.data);
	                }, function(response) {});
	        },
	
	        getArticle: function(callback) {
	            $http.get(`/api` + $location.path()).then(function(response) {
	                callback(response.data);
	            }, function(response) {
	
	            });
	        },
	
	        getRandomArticle: function(callback) {
	            $http.get(`/api/articles/random`).then(function(response) {
	                callback(response.data);
	            }, function(response) {
	
	            });
	        },
	
	        createArticle: function(request, callback) {
	            $http.post('/api/articles', request, {
	                headers: {
	                    "Content-type": "application/json; charset=UTF-8"
	                },
	                withCredentials: true
	            }).then(function(response) {
	                callback(response.data);
	            }, function(response) {
	
	            });
	        },
	
	        updateArticle: function(request, id,callback) {
	            $http.put('/api/articles/' + id, request, {
	                headers: {
	                    "Content-type": "application/json; charset=UTF-8"
	                },
	                withCredentials: true
	            }).then(function(response) {
	                callback(response.data);
	            }, function(response) {
	
	            });
	        },
	
	        deleteArticle: function(id, callback) {
	            $http.delete('/api/articles/' + id, {
	                headers: {
	                    "Content-type": "application/json; charset=UTF-8"
	                },
	                withCredentials: true
	            }).then(function(response) {
	                callback(response.data);
	            }, function(response) {
	
	            });
	        }
	    };
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function($http) {
	    'use strict';
	    return {
	
	        signIn: function(request, callback) {
	          $http.post('/api/signup', request, {
	              headers: {
	                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	              },
	              withCredentials: true
	          }).then(function(response) {
	              callback(response.data);
	          }, function(response) {
	
	          });
	
	        },
	
	        getUser: function(username, callback) {
	          $http.get('/api/users' + username, {
	            withCredentials: true
	          }).then(function(response) {
	            callback(response.data);
	          }, function (response) {
	
	          });
	        },
	
	        createUser: function(request, callback) {
	          $http.post('/api/register', request, {
	            headers: {
	                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	            },
	            withCredentials: true
	          }).then(function (response) {
	            callback(response.data);
	          }, function (response) {
	
	          });
	        },
	
	        updateUser: function(request, username, callback) {
	          $http.put('/api/users' + username, request, {
	            headers: {
	                "Content-type": "application/json; charset=UTF-8"
	            },
	            withCredentials: true
	          }).then(function (response) {
	            callback(response.data);
	          }, function (response) {
	
	          });
	        },
	
	        logout : function (callback) {
	          $http.get('/api/logout', {
	            withCredentials: true
	          }).then(function (response) {
	            callback(response.data);
	          }, function (response) {
	
	          });
	        },
	
	        deleteUser: function(username, callback) {
	          $http.delete('/api/users' + username, {
	            withCredentials: true
	          }).then(function (response) {
	            callback(response.data);
	          },function (response) {
	
	          });
	        }
	    };
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() {
	    var user = '';
	    var auth = false;
	
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
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  position: relative;\n}\na {\n  text-decoration: none;\n}\nheader {\n  text-align: center;\n  height: 60px;\n  top: 0;\n  left: 0;\n  background-color: #1a9cb0;\n  width: 100%;\n}\n.wrapper {\n  min-height: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n  background-color: #f0f2f4;\n  position: relative;\n}\n.content {\n  padding: 30px;\n}\n.stab {\n  height: 100px;\n}\nfooter {\n  height: 40px;\n  background-color: #464547;\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  color: white;\n  font-size: 24px;\n  line-height: 60px;\n  padding: 0 10px;\n  box-sizing: border-box;\n}\n", ""]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	    "use strict";
	    var ControllerArticle = __webpack_require__(9);
	    var articleTemplate = __webpack_require__(10);
	    var articlesStyle = __webpack_require__(11);
	
	    app.controller('controllerArticle', ControllerArticle);
	
	    var config = {
	        template: articleTemplate,
	        controller: 'controllerArticle',
	        controllerAs: 'articleCntr',
	        css: articlesStyle
	    };
	
	    app.component('articleitem', config);
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function($scope, $rootScope, $location, $articles, usersService) {
	    'use strict';
	    this.articleItem = {};
	    this.comment = '';
	    this.checkUser = usersService.isLogged();
	    this.checkRating = false;
	    this.checkArticleOwner = false;
	
	
	
	    $rootScope.$on('userSignIn', angular.bind(this, function() {
	        this.checkUser = true;
	        if (this.articleItem.userName.length === 0 ||
	            this.articleItem.userName.indexOf(usersService.getUser()) === -1) {
	            this.checkRating = true;
	        }
	        if (this.articleItem.authorusername === usersService.getUser()) {
	            this.checkArticleOwner = true;
	        }
	    }));
	
	    $rootScope.$on('logout', angular.bind(this, function() {
	        this.checkUser = false;
	        this.checkRating = false;
	        this.checkArticleOwner = false;
	    }));
	
	    this.init = function () {
	      $articles.getArticle(angular.bind(this, function(data) {
	          this.articleItem = {};
	          this.dateComment(data.article);
	          this.articleItem = data.article;
	          if (this.checkUser && (data.article.userName.length === 0 ||
	              data.article.userName.indexOf(usersService.getUser()) === -1)) {
	              this.checkRating = true;
	          }
	          if (this.articleItem.authorusername === usersService.getUser()) {
	              this.checkArticleOwner = true;
	          }
	      }));
	    }
	
	    this.remove = function() {
	        $articles.deleteArticle(this.articleItem.idArticle, angular.bind(this, function(data) {
	            if (data.status === 'OK') {
	                this.articleItem = {};
	                $location.path('/');
	            }
	        }));
	    };
	
	    this.date = function(data) {
	
	      data.date = data.date.substring(0,
	                data.date.indexOf('T')) + ' ' +
	            data.date.substring(data.date.indexOf('T') + 1,
	                data.date.indexOf('.'));
	
	    };
	
	    this.dateComment = function(article) {
	      article.date = new Date(+article.date);
	      article.date = article.date.toDateString();
	        if (article.comments.length !== 0) {
	            article.comments.forEach(angular.bind(this, function(item, index) {
	                this.date(item);
	            }));
	        } else {
	            return;
	        }
	    };
	
	    this.incrementRating = function() {
	        var rating = +this.articleItem.rating + 1;
	
	        var request = {
	            rating: rating,
	            usersRating: usersService.getUser()
	        };
	
	        this.checkRating = false;
	        var jsonReguest = JSON.stringify(request);
	        this.updateArticle(jsonReguest, this.articleItem.idArticle);
	    };
	
	    this.updateArticle = function functionName(jsonReguest, id) {
	        $articles.updateArticle(jsonReguest, id,
	            angular.bind(this, function(data) {
	                this.articleItem = {};
	                this.dateComment(data.article);
	                this.articleItem = data.article;
	
	            }));
	    };
	
	    this.submitComment = function() {
	        if (this.comment !== '') {
	            var comment = {
	                comment: {
	                    text: this.comment,
	                    link: '',
	                    username: ''
	                }
	            };
	
	            var request = JSON.stringify(comment);
	            this.updateArticle(request, this.articleItem.idArticle);
	            this.comment = '';
	        } else {
	            this.error = 'Нет данных';
	        }
	
	    };
	
	    this.init();
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"article\">\r\n    <div class=\"del\"  ng-show=\"articleCntr.checkArticleOwner\">\r\n        <a class=\"delete-button\" ng-click=\"articleCntr.remove()\">\r\n      {{'DELETE_ARTICLE' | translate}}</a>\r\n    </div>\r\n    <div class=\"article-name\">\r\n        <span>{{articleCntr.articleItem.title}}</span>\r\n\r\n    </div>\r\n    <div class=\"article-info\">\r\n        <div class=\"number-listeners\">\r\n            <a ng-href=\"#/users/{{articleCntr.articleItem.authorusername}}\">\r\n              {{articleCntr.articleItem.authorusername}}</a></div>\r\n        <div class=\"begin\">{{articleCntr.articleItem.date}}</div>\r\n        <div>\r\n            <a ng-click=\"articleCntr.incrementRating()\" ng-show=\"articleCntr.checkRating\">\r\n                <span class=\"fa fa-thumbs-o-up up\"></span></a>\r\n            {{articleCntr.articleItem.rating}}</div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<div class=\"title-comment\">{{'COMMENTS' | translate}}</div>\r\n<div class=\"comment\" ng-repeat=\"comment in articleCntr.articleItem.comments\">\r\n    <div class=\"author-comment\">\r\n        {{comment.username}}\r\n    </div>\r\n    <div class=\"date-comment\">\r\n        {{comment.date}}\r\n    </div>\r\n    <div class=\"text\">\r\n        {{comment.text}}\r\n    </div>\r\n</div>\r\n<div class=\"input-comment\" ng-show=\"articleCntr.checkUser\">\r\n    <div>\r\n        <textarea class=\"field-comment\" ng-model=\"articleCntr.comment\" class=\"field-input-comment\"></textarea>\r\n    </div>\r\n    <button class=\"submit-comment\" ng-click=\"articleCntr.submitComment()\">{{'SUBMIT' | translate}}</button>\r\n</div>\r\n";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./articles.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./articles.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".sort-title {\n  font-size: 20px;\n  display: block;\n  margin-bottom: 10px;\n}\n.row {\n  width: 100%;\n  display: inline-block;\n  margin-top: 20px;\n}\n.right {\n  float: right;\n}\n.article {\n  width: 100%;\n  /*height: 150px;*/\n  background-color: white;\n  display: inline-block;\n}\n.article-name {\n  padding: 10px 20px 0;\n  height: 35px;\n  font-size: 16px;\n  text-transform: uppercase;\n  display: block;\n  vertical-align: middle;\n  text-align: center;\n}\n.article-name span {\n  margin: 0 auto;\n}\n.article-info {\n  margin-top: 10px;\n  text-align: center;\n  color: #999;\n  font-size: 16px;\n}\n.article-info > div {\n  padding: 10px;\n}\n.registration {\n  padding: 0 20px;\n}\n.registration a {\n  background-color: #1a9cb0;\n  text-align: center;\n  color: white;\n  font-weight: bold;\n  text-transform: uppercase;\n  width: 100%;\n  display: inline-block;\n  padding: 15px 0;\n}\n.title-comment {\n  margin-top: 20px;\n  text-align: center;\n  font-size: 24px;\n  color: white;\n  display: inline-block;\n  width: 100%;\n}\n.comment {\n  margin-top: 20px;\n  background-color: white;\n  display: inline-block;\n  width: 100%;\n  padding: 10px 20px;\n}\n.input-comment {\n  margin-top: 20px;\n  background-color: white;\n  display: inline-block;\n  width: 100%;\n  padding: 10px 20px;\n}\n.field-input-comment {\n  width: 40%;\n  height: 60px;\n}\n.submit-comment {\n  border: 0;\n  background-color: #1a9cb0;\n  text-align: center;\n  color: white;\n  font-weight: bold;\n  text-transform: uppercase;\n  height: 30px;\n  line-height: 30px;\n  width: 20%;\n  display: inline-block;\n  margin-top: 10px;\n}\n.more-courses {\n  height: 3px;\n  background-color: white;\n  position: relative;\n  margin: 55px 0 20px;\n}\n.more-courses a {\n  display: block;\n  border-radius: 20px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: -20px;\n  bottom: 0;\n  margin: 0 auto;\n  height: 40px;\n  width: 185px;\n  font-size: 16px;\n  text-transform: uppercase;\n  color: #39c2d7;\n  background-color: white;\n  text-decoration: none;\n  text-align: center;\n  line-height: 40px;\n}\n.up {\n  cursor: pointer;\n}\n.author-comment {\n  display: inline-block;\n  margin-right: 10px;\n  font-size: 20px;\n}\n.date-comment {\n  display: inline-block;\n  font-size: 12px;\n}\n.text {\n  font-size: 16px;\n  margin-top: 15px;\n}\n.field-comment {\n  height: 70px;\n  width: 300px;\n}\n.del {\n  height: 30px;\n}\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	    "use strict";
	    var ControllerArticles = __webpack_require__(14);
	    var articlesTemplate = __webpack_require__(15);
	    var articlesStyle = __webpack_require__(11);
	
	    app.controller('controllerArticles', ControllerArticles);
	
	    var config = {
	        template: articlesTemplate,
	        controller: 'controllerArticles',
	        controllerAs: 'articlesCntr',
	        css: articlesStyle
	    };
	
	    app.component('articles', config);
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function($scope, $articles, $location) {
	    'use strict';
	    this.articles = [];
	    this.sortType = 'date';
	    this.startIndex = 0;
	    this.tempStartIndex = 0;
	    this.count = 10;
	    
	    this.init = function () {
	      $articles.getArticlesList(this.startIndex, this.count,
	        this.sortType, angular.bind(this, function(data) {
	              this.date(data);
	              this.articles = data.articles;
	      }));
	    }
	
	    this.date = function (data) {
	      data.articles.forEach(function(item, index) {
	          item.date = new Date(+item.date);
	          item.date = item.date.toDateString();
	      });
	    };
	
	    this.sort = function(sortType) {
	        this.sortType = sortType;
	        $articles.getArticlesList(this.startIndex, this.count,
	          sortType, angular.bind(this, function(data) {
	                this.date(data);
	                this.articles = data.articles;
	        }));
	    };
	
	    this.randomArticle = function() {
	        $articles.getRandomArticle(angular.bind(this, function(data) {
	                if (angular.equals(data.status, 'OK')) {
	                    $location.url(data.article.link);
	                }
	
	        }));
	    };
	
	    this.getMoreArticle = function() {
	        this.tempStartIndex = this.tempStartIndex + 10;
	        $articles.getArticlesList(this.tempStartIndex, this.count,
	          this.sortType, angular.bind(this, function(data) {
	              this.date(data);
	                data.articles.forEach(function(item, index) {
	                    this.articles.push(item);
	                });
	
	        }));
	    };
	
	    this.init();
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\r\n<div>\r\n    <div>\r\n        <span class=\"sort-title\">{{'SORT' | translate}}</span>\r\n        <div>\r\n        <button class=\"signin-button sort-button\"\r\n          ng-click=\"articlesCntr.sort('date')\">{{'DATE' | translate}}</button>\r\n        <button class=\"signin-button sort-button\"\r\n          ng-click=\"articlesCntr.sort('rating')\">{{'RATING' | translate}}</button>\r\n        <a class=\"signin-button sort-button right\"\r\n          ng-href=\"#/articles/random\">{{'RANDOM_ARTICLE' | translate}}</a>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" ng-repeat=\"article in articlesCntr.articles\">\r\n        <div class=\"article\">\r\n            <div class=\"article-name\">{{article.title}}</div>\r\n            <div class=\"article-info\">\r\n                <a ng-href=\"#/users/{{article.authorusername}}\"\r\n                  class=\"number-listeners\">{{article.authorusername}}</a>\r\n                <div class=\"begin\">{{article.date}}</div>\r\n            </div>\r\n            <div class=\"registration\">\r\n                <a ng-href=\"#/articles/{{article.idArticle}}\">{{'SHOW' | translate}}</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"more-courses\">\r\n    <a href=\"\" ng-click=\"articlesCntr.getMoreArticle()\">Больше статей</a>\r\n</div>\r\n";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	    "use strict";
	    var ControllerHeader = __webpack_require__(17);
	    var headerTemplate = __webpack_require__(18);
	    var headerStyle = __webpack_require__(19);
	
	    app.controller('controllerHeader', ControllerHeader);
	
	    var config = {
	        template: headerTemplate,
	        controller: 'controllerHeader',
	        controllerAs: 'headerCntr',
	        css: headerStyle
	    };
	
	    app.component('header', config);
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function($rootScope, $translate, $scope, usersService, $users) {
	    'use strict';
	
	    this.show = false;
	    this.user = usersService.isLogged();
	    this.username = usersService.getUser();
	    $rootScope.locale = $translate.proposedLanguage();
	
	    $rootScope.$on('userSignIn', angular.bind(this, function() {
	            this.username = usersService.getUser();
	            this.user = usersService.isLogged();
	    }));
	
	    this.showSignIn = function() {
	        $rootScope.$emit('showSignIn');
	    };
	
	    this.changeLang = function(locale) {
	        $rootScope.locale = locale;
	        $translate.use($rootScope.locale);
	
	    };
	
	    this.logout = function() {
	        $users.logout(angular.bind(this, function(data) {
	                usersService.setUser('');
	                usersService.logged(false);
	                this.user = usersService.isLogged();
	                $rootScope.$broadcast('logout');
	        }));
	    };
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"all-articles\">\r\n  <a class=\"signin-button\" ng-href=\"#/\">\r\n    <span class=\"fa fa-list\"></span>{{'ALL_ARTICLES' | translate}}</a>\r\n</div>\r\n<span class=\"title\">{{'MAIN_TITLE' | translate}}</span>\r\n<div class=\"sign-in\">\r\n  <button class=\"signin-button\" ng-click=headerCntr.showSignIn() ng-hide=\"headerCntr.user\">\r\n    <span class=\"fa fa-sign-in\"></span>{{'SIGN_IN' | translate}}\r\n  </button>\r\n\r\n  <div class=\"user\" ng-show=\"headerCntr.user\">\r\n    <a ng-href=\"#/users/{{headerCntr.username}}\">{{headerCntr.username}}</a>\r\n  </div>\r\n  <button class=\"signin-button fix\" ng-click=headerCntr.logout() ng-show=\"headerCntr.user\">\r\n    {{'LOGOUT' | translate}}<span class=\"fa fa-sign-out\"></span>\r\n  </button>\r\n  <div class=\"location\">\r\n    <a href=\"\" ng-click=\"headerCntr.changeLang('en')\">EN</a>\r\n    <div class=\"separator\"></div>\r\n    <a href=\"\" ng-click=\"headerCntr.changeLang('ru')\">RU</a>\r\n  </div>\r\n</div>\r\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./header.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./header.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".title {\n  font-size: 32px;\n  color: white;\n  line-height: 60px;\n}\n.all-articles {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 60px;\n}\n.sign-in {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 60px;\n}\n.signin-button {\n  height: 60px;\n  text-align: center;\n  vertical-align: middle;\n  text-transform: uppercase;\n  background: #a3c644;\n  border: 0;\n  color: white;\n  font-weight: normal;\n  padding: 0 15px;\n  font-size: 18px;\n  cursor: pointer;\n  display: inline-block;\n  line-height: 60px;\n  margin-left: -0.36em;\n}\n.signin-button:hover {\n  background-color: #8cad35;\n}\n.delete-button {\n  height: 30px;\n  line-height: 30px;\n  float: right;\n  font-size: 14px;\n  background-color: #e34234;\n  border: 0;\n  color: white;\n  font-weight: normal;\n  padding: 0 15px;\n  text-align: center;\n  vertical-align: middle;\n  text-transform: uppercase;\n  font-size: 18px;\n  cursor: pointer;\n  display: inline-block;\n}\n.delete-button:hover {\n  background-color: #92000a;\n}\n.signin-button span {\n  margin-right: 10px;\n}\n.location {\n  height: 60px;\n  display: inline-block;\n  border: 0;\n  padding: 0;\n  margin: 0;\n  text-align: center;\n}\n.separator {\n  position: absolute;\n  top: 15px;\n  right: 30px;\n  height: 25px;\n  width: 1px;\n  background-color: white;\n  display: inline-block;\n  margin-right: 3px;\n}\n.location a {\n  margin-right: 3px;\n  margin-left: 3px;\n  color: white;\n  font-size: 18px;\n  font-weight: bold;\n}\n.location a:hover {\n  color: #157c8c;\n}\n.user {\n  height: 60px;\n  line-height: 60px;\n  font-size: 20px;\n  color: white;\n  display: inline-block;\n  padding: 0 20px;\n  margin-left: -0.36em;\n}\n.user:hover {\n  background-color: #157c8c;\n}\n.user a {\n  color: white;\n}\n.fix {\n  margin-top: -0.37em;\n}\n", ""]);
	
	// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	    "use strict";
	    var ControllerUser = __webpack_require__(22);
	    var userTemplate = __webpack_require__(23);
	    var userStyle = __webpack_require__(24);
	
	    app.controller('controllerUser', ControllerUser);
	
	    var config = {
	        template: userTemplate,
	        controller: 'controllerUser',
	        controllerAs: 'userCntr',
	        css: userStyle
	    };
	
	    app.component('user', config);
	};


/***/ },
/* 22 */
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
	        this.checkUser = true;
	    }));
	
	    $users.getUser(username, angular.bind(this, function(data) {
	        this.user = data.user;
	        if (this.user.username === usersService.getUser()) {
	            this.checkUser = true;
	        }
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
	            if (angular.equals(data.status, 'OK')) {
	                this.create = false;
	                this.hide = false;
	                this.user.articleCount++;
	            }
	        }));
	    };
	
	    this.updateUser = function() {
	        var request = {
	            email: this.email
	        };
	        var reqJson = JSON.stringify(request);
	        $users.updateUser(reqJson, username, angular.bind(this, function(data) {
	            this.user = {};
	            this.user = data.user;
	            this.update = false;
	            this.hide = false;
	        }));
	    };
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"profile\" ng-hide=\"userCntr.hide\">\r\n    <span></span>\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <div class=\"student-login\">\r\n                <div class=\"user-icon\"></div>\r\n            </div>\r\n            <span>{{userCntr.user.username}}</span>\r\n            <a ng-show=\"userCntr.checkUser\" class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.showUpdateBlock()\">\r\n        {{'EDIT' | translate}}</a>\r\n            <a ng-show=\"userCntr.checkUser\" class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.showCreateArticleBlock()\">\r\n          {{'CREATE' | translate}}</a>\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_EMAIL' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.email}}</div>\r\n        </div>\r\n        <div ng-show=\"userCntr.checkUser\" class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_COMMENT_COUNT' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.commentCount}}</div>\r\n        </div>\r\n        <div ng-show=\"userCntr.checkUser\" class=\"row-content\">\r\n            <div class=\"title-info text-info\">{{'USER_ARTICLE_COUNT' | translate}}</div>\r\n            <div class=\"value-info text-info\">{{userCntr.user.articleCount}}</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"update-profile\" ng-show=\"userCntr.update\">\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <!-- <div class=\"student-login\"><div class=\"user-icon\"></div></div> -->\r\n            <span>{{userCntr.user.username}}</span>\r\n            <a class=\"signin-button cancel-button\" ng-click=\"userCntr.hideUpdateBlock()\">\r\n              {{'CANCEL' | translate}}</a>\r\n            <a class=\"signin-button update-button\" ng-click=\"userCntr.updateUser()\">\r\n              {{'SAVE'| translate}}</a>\r\n\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">\r\n                <label for=\"email\">Email</label>\r\n            </div>\r\n            <input ng-model=\"userCntr.email\" type=\"text\"\r\n              class=\"value-info text-info field-input\"\r\n              placeholder=\"{{'INPUT_EMAIL' | translate}}\" id=\"email\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"update-profile\" ng-show=\"userCntr.create\">\r\n    <div class=\"info-content\">\r\n        <div class=\"student-title\">\r\n            <a class=\"signin-button cancel-button\"\r\n              ng-click=\"userCntr.hideCreateArticleBlock()\">{{'CANCEL' | translate}}</a>\r\n            <a class=\"signin-button update-button\"\r\n              ng-click=\"userCntr.createArticle()\">{{'CREATE'| translate}}</a>\r\n\r\n        </div>\r\n        <div class=\"row-content\">\r\n            <div class=\"title-info text-info\">\r\n                <label for=\"email\">{{'INPUT_TITLE_ARTICLE' | translate}}</label>\r\n            </div>\r\n            <input ng-model=\"userCntr.titleArticle\"\r\n              type=\"text\" class=\"value-info text-info field-input\"\r\n              placeholder=\"{{'INPUT_TITLE_ARTICLE' | translate}}\" id=\"email\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./user.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./user.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".profile {\n  width: 100%;\n  display: inline-block;\n}\n.profile span {\n  display: block;\n  text-align: center;\n  font-size: 24px;\n  color: #464547;\n  text-transform: uppercase;\n}\n.info-content {\n  background-color: #f9f9f9;\n  padding: 20px;\n  padding-top: 150px;\n  margin: 10px 40px;\n  position: relative;\n}\n.title-info {\n  width: 200px;\n  display: inline-block;\n  color: #a9a9a9;\n}\n.value-info {\n  display: inline-block;\n}\n.text-info {\n  font-size: 18px;\n}\n.row-content {\n  margin-bottom: 10px;\n}\n.student-title {\n  position: absolute;\n  top: 15px;\n  /*left: 45px;*/\n  right: 45px;\n  width: 95%;\n}\n.update-button {\n  height: 30px;\n  line-height: 30px;\n  float: right;\n  font-size: 14px;\n  color: white;\n}\n.sort-button {\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  color: white;\n}\n.signin-button:hover {\n  background-color: #8cad35;\n}\n.cancel-button {\n  height: 30px;\n  line-height: 30px;\n  float: right;\n  font-size: 14px;\n  background-color: #7f7f7f;\n}\n.cancel-button:hover {\n  background-color: #646464;\n}\n.student-login {\n  display: inline-block;\n}\n.student-title {\n  text-align: center;\n}\n.student-title span {\n  font-size: 24px;\n  color: #a9a9a9;\n  display: inline-block;\n  position: absolute;\n  top: 55px;\n  margin-left: 30px;\n}\n.update-profile {\n  display: block;\n}\n.user-icon {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: url(" + __webpack_require__(26) + ") no-repeat #fff;\n  background-position: center center;\n  display: inline-block;\n}\n.field-input {\n  width: 250px;\n  font-size: 14px;\n  padding: 5px;\n}\n", ""]);
	
	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d39681103ab28f056027d2b177a4ae0f.png";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	    "use strict";
	    var ControllerSignIn = __webpack_require__(28);
	    var signInTemplate = __webpack_require__(29);
	    var signInStyle = __webpack_require__(30);
	
	    app.controller('controllerSignIn', ControllerSignIn);
	
	    var config = {
	        template: signInTemplate,
	        controller: 'controllerSignIn',
	        controllerAs: 'signInCntr',
	        css: signInStyle
	    };
	
	    app.component('signin', config);
	
	};


/***/ },
/* 28 */
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
	                if(!this.show){
	                    $rootScope.$emit('userSignIn');
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
	                if(!this.show){
	                    $rootScope.$emit('userSignIn');
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
/* 29 */
/***/ function(module, exports) {

	module.exports = "<div ng-show=\"signInCntr.show\">\r\n    <a class=\"overlay\" ng-click=\"signInCntr.hide()\"></a>\r\n    <div class=\"regestration-window\">\r\n        <form class=\"form\">\r\n            <div class=\"error\" ng-show=\"signInCntr.error\">{{'ERROR' | translate}}</div>\r\n            <div class=\"error\" ng-show=\"signInCntr.errorSign\">{{'ERROR_SIGN' | translate}}</div>\r\n            <div class=\"error\" ng-show=\"signInCntr.errorRegistred\">{{'ERROR_REGISTRED' | translate}}</div>\r\n            <input ng-model=\"signInCntr.user.login\" class=\"input-field\"\r\n              placeholder=\"{{'INPUT_LOGIN' | translate}}\" type=\"text\">\r\n            <input ng-model=\"signInCntr.user.password\" ng-model-options=\"{ getterSetter: true }\"\r\n              class=\"input-field\" placeholder=\"{{'INPUT_PASSWORD' | translate}}\" type=\"password\">\r\n\r\n            <button ng-click=\"signInCntr.signIn()\" class=\"signin-button submit\" type=\"submit\">\r\n              {{'SIGN_IN' | translate}}</button>\r\n            <div class=\"or\"><span>{{'OR' | translate}}</span></div>\r\n            <button class=\"signin-button submit\" ng-click=\"signInCntr.registred()\"\r\n            type=\"submit\">{{'SIGN_UP' | translate}}</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./signIn.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./signIn.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".regestration-window {\n  position: absolute;\n  top: 0;\n  left: 455px;\n  width: 500px;\n  margin: auto;\n  display: block;\n  height: 500px;\n  background-color: white;\n  z-index: 10001;\n  position: fixed;\n}\n.overlay {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10000;\n  display: block;\n  background-color: rgba(0, 0, 0, 0.65);\n  position: fixed;\n  cursor: default;\n}\n.window-header {\n  text-align: center;\n  color: white;\n  font-size: 24px;\n  line-height: 60px;\n}\n.form {\n  padding: 50px 100px;\n}\n.input-field {\n  height: 50px;\n  width: 100%;\n  margin-bottom: 25px;\n  box-sizing: border-box;\n}\n.submit {\n  width: 100%;\n}\n.or {\n  text-align: center;\n  color: #999;\n  font-size: 18px;\n  margin: 15px 0;\n}\n.or span {\n  margin: 0 10px;\n}\n.or:before {\n  content: \"\";\n  border-bottom: 1px solid #999;\n  width: 100px;\n  height: 1px;\n  display: inline-block;\n  position: relative;\n  top: -6px;\n}\n.or:after {\n  content: \"\";\n  border-bottom: 1px solid #999;\n  width: 100px;\n  height: 1px;\n  display: inline-block;\n  position: relative;\n  top: -6px;\n}\n.error {\n  text-align: center;\n  font-size: 24px;\n  margin-bottom: 20px;\n  margin-top: -10px;\n  color: red;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map