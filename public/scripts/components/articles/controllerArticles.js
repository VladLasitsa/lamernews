  var moment = require('moment');
 module.exports = function($scope, $articles, $location) {
     'use strict';
     this.articles = [];
     this.sortType = 'date';
     this.startIndex = 0;
     this.tempStartIndex = 0;
     this.count = 11;
     this.shift = 10;
     this.showViewMore = false;

     this.checkNumberArticles = function(data) {
         if (data.articles.length === this.count) {
             this.showViewMore = true;
             if (data.articles.length > 1) {
               console.log("wat");
                 data.articles.pop();
             }
         } else {
             this.showViewMore = false;
         }
     };

     this.init = function() {
         $articles.getArticlesList(this.startIndex, this.count,
             this.sortType, angular.bind(this, function(data) {
                 this.checkNumberArticles(data);
                 this.date(data);
                 this.articles = data.articles;
             }));
     };

     this.date = function(data) {
         data.articles.forEach(function(item, index) {
             item.date = moment(item.date).format('MM.DD.YY HH:mm');
         });
     };

     this.sort = function(sortType) {
         this.sortType = sortType;
         $articles.getArticlesList(this.startIndex, this.count,
             sortType, angular.bind(this, function(data) {
                 this.checkNumberArticles(data);
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
         this.tempStartIndex = this.tempStartIndex + this.shift;
         $articles.getArticlesList(this.tempStartIndex, this.count,
             this.sortType, angular.bind(this, function(data) {
               console.log(data);
                 this.checkNumberArticles(data);
                 this.date(data);
                 data.articles.forEach(angular.bind(this,function(item, index) {
                     this.articles.push(item);
                 }));
             }));
     };

     this.init();
 };
