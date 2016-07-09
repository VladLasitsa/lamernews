module.exports = function($scope, $rootScope, $articles, $location, usersService) {
    'use strict';
    this.articleItem = {};
    this.comment = '';
    this.checkUser = usersService.isLogged();
    this.checkRating = false;
    this.checkArticleOwner = false;



    $rootScope.$on('userSignIn', angular.bind(this, function() {
            this.checkUser = true;
            if(this.articleItem.usersRating.length === 0 ||
              this.articleItem.usersRating.indexOf(usersService.getUser()) === -1) {
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

    $articles.getArticle(angular.bind(this, function(data) {
            this.articleItem = {};
            this.date(data.article);
            this.articleItem = data.article;
             if(data.article.usersRating.length === 0 ||
               data.article.usersRating.indexOf(usersService.getUser()) === -1) {
               this.checkRating = true;
             }
            if (this.articleItem.authorusername === usersService.getUser()) {
                this.checkArticleOwner = true;
            }
    }));


    this.remove = function() {
        $articles.deleteArticle(angular.bind(this, function(data) {
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
        this.articleItem.usersRating.push(usersService.getUser());
        var request = {
            rating: rating,
            usersRating: this.articleItem.usersRating
        };

        this.checkRating = false;
        var jsonReguest = JSON.stringify(request);
        this.updateArticle(jsonReguest);
    };

    this.updateArticle = function functionName(jsonReguest) {
        $articles.updateArticle(jsonReguest,
            angular.bind(this, function(data) {
                    this.articleItem = {};
                    this.date(data.article);
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
            this.updateArticle(request);
            this.comment = '';
        } else {
            this.error = 'Нет данных';
        }

    };

};
