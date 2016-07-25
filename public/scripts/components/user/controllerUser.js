module.exports = function($scope, $rootScope, $users, $location, $articles, usersService) {
    'use strict';

    this.user = {};
    this.email = '';
    this.titleArticle = '';
    this.hide = false;
    this.update = false;
    this.create = false;
    this.checkUser = false;
    this.contentArticle = '';
    this.error = false;
    var path = $location.path();
    var username = path.substring(path.lastIndexOf('/'));

    $rootScope.$on('userSignIn', angular.bind(this, function() {
        this.init();
    }));

    $rootScope.$on('logout', angular.bind(this, function() {
        this.checkUser = false;
    }));

    this.init = function() {
        $users.getUser(username, angular.bind(this, function(data) {
            this.user = data.user;
            if (this.user.username === usersService.getUser()) {
                this.checkUser = true;
            }
        }));
    };

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
        if (this.titleArticle !== '' && this.contentArticle !== '') {
            var request = {
                title: this.titleArticle,
                content: this.contentArticle
            };
            $articles.createArticle(JSON.stringify(request), angular.bind(this, function(data) {
                if (angular.equals(data.status, 'OK')) {
                    this.create = false;
                    this.hide = false;
                    this.user.articleCount++;
                }
            }));
        } else {
            this.error = true;
        }
    };

    this.updateUser = function() {
        if (this.email !== '') {
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
        } else {
            this.error = true;
        }

    };

    this.init();
};
