var Article = require('../models/Article.js');
var User = require('../models/User.js');

module.exports = function(app) {
    'use strict';

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.send({
                status: "ERROR",
                description: "User is not authentificated"
            });
        }
    }

    function incrementCountComments(username) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount + 1, user.articleCount, username,
                function() {

                });
        });
    }

    function incrementCountArticles(username) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount, user.articleCount + 1, username,
                function() {

                });
        });
    }

    app.get('/api/articles/:startIndex/:count', function(req, res) {
        var limit = +req.params.count;
        var startIndex = +req.params.startIndex;
        var sort = req.query.sort;
        Article.getArticles(sort, limit, startIndex, function(articles) {
            var response = {
                status: 'OK',
                articles: articles
            }
            res.json(response);
        });

    });

    app.get('/api/articles/:id', function(req, res) {
        if (req.params.id === 'random') {
            Article.getArticles('date', 0, 1000, function(articles) {
                var randomNumber = Math.floor(Math.random() * (articles.length) + 2);
                Article.getArticle(randomNumber, function(article, comments, userName) {
                    article.comments = comments;
                    article.userName = userName;
                    var response = {
                        status: 'OK',
                        article: article
                    }
                    res.json(response);
                });
            })

        } else {
            Article.getArticle(req.params.id, function(article, comments, userName) {
                article.comments = comments;
                article.userName = userName;
                var response = {
                    status: 'OK',
                    article: article
                }
                res.json(response);
            });

        }

    });


    app.post('/api/articles', isLogged, function(req, res) {
        var newArticle = {};
        var date = Date.now();

        newArticle.authorusername = req.user.username;
        newArticle.title = req.body.title;
        newArticle.link = '';
        newArticle.rating = 0;
        newArticle.date = date.toString();


        Article.createArticle(newArticle, function(article) {
            incrementCountArticles(req.user.username);
            var response = {
                status: 'OK',
                article: article
            }
            return res.json(response);
        });

    });

    app.put('/api/articles/:id', isLogged, function(req, res) {
        Article.getArticle(req.params.id, function(article) {
            var rating = +req.body.rating || article.rating;
            if (typeof req.body.usersRating !== 'undefined') {
                Article.usersRating(req.body.usersRating, req.params.id, function() {

                });
            }

            if (typeof req.body.comment !== 'undefined') {
                req.body.comment.username = req.user.username;
                req.body.comment.date = new Date();
                // article.comments.push(req.body.comment);
                Article.createComment(req.body.comment, req.params.id, function() {
                    incrementCountComments(req.user.username);
                      update();
                });
            }

            var update = function() {
                Article.updateArticle(rating, req.params.id, function() {
                    Article.getArticle(req.params.id, function(article, comments, userName) {
                        article.comments = comments;
                        article.userName = userName;
                        var response = {
                            status: 'OK',
                            article: article
                        }
                        return res.json(response);
                    });

                });
            }

            update();
        });
    });

    app.delete('/api/articles/:id', isLogged, function(req, res) {

        Article.deleteArticle(req.params.id, function() {
            var response = {
                status: 'OK'
            }
            return res.json(response);
        });


    });
}
