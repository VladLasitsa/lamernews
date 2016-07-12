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
