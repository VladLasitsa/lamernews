 var moment = require('moment');
module.exports = function($scope, $rootScope, $location, $articles, usersService) {
    'use strict';
    this.articleItem = {};
    this.comment = '';
    this.checkUser = usersService.isLogged();
    this.checkRating = 'disabled';
    this.checkArticleOwner = false;
    this.error = false;
    this.showComments = usersService.isLogged();

    this.checkСapabilitiesUser = function () {
      if(this.checkUser || this.articleItem.comments.length !== 0) {
        this.showComments = true;
      }
      if (this.checkUser && (this.articleItem.usersNameRating.length === 0 ||
          this.articleItem.usersNameRating.indexOf(usersService.getUser()) === -1)) {
          this.checkRating = '';
      }
      if (this.articleItem.authorusername === usersService.getUser()) {
          this.checkArticleOwner = true;
      }
    };

    $rootScope.$on('userSignIn', angular.bind(this, function() {
        this.checkUser = true;
        this.checkСapabilitiesUser();
    }));

    $rootScope.$on('logout', angular.bind(this, function() {
        this.checkUser = false;
        this.checkRating = 'disabled';
        this.checkArticleOwner = false;
    }));

    this.init = function() {
        $articles.getArticle(angular.bind(this, function(data) {
            this.articleItem = {};
            this.dateComment(data.article);
            this.articleItem = data.article;
            this.checkСapabilitiesUser();
        }));
    };

    this.remove = function() {
        $articles.deleteArticle(this.articleItem.idArticle, angular.bind(this, function(data) {
            if (data.status === 'OK') {
                this.articleItem = {};
                $location.path('/');
            }
        }));
    };

    this.dateComment = function(article) {
      article.date = moment(article.date).format('MM.DD.YY HH:mm');
        if (article.comments.length !== 0) {
            article.comments.forEach(angular.bind(this, function(item, index) {
                item.date = moment(item.date).format('MM.DD.YY HH:mm');
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

        this.checkRating = 'disabled';
        var jsonReguest = JSON.stringify(request);
        this.updateArticle(jsonReguest, this.articleItem.idArticle);
    };

    this.updateArticle = function functionName(jsonReguest, id) {
        $articles.updateArticle(jsonReguest, id,
            angular.bind(this, function(data) {
                this.articleItem = {};
                this.dateComment(data.article);
                this.articleItem = data.article;
                this.checkСapabilitiesUser();
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
            this.error = true;
        }

    };

    this.init();
};
