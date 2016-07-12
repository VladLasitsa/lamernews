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
