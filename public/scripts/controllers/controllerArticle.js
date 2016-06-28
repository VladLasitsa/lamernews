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
