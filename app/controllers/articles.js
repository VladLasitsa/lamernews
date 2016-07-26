var Article = require('../models/Article.js');
var User = require('../models/User.js');
var errorHandler = require('./errorHandler');
var inf = 1000000;

module.exports = function(app) {
    'use strict';

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send({
                status: "ERROR",
                description: "User is not authentificated"
            });
        }
    }

    function incrementCountComments(username, res) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount + 1, user.articleCount, username,
                function() {}, errorHandler(res));
        }, errorHandler(res));
    }

    function parseResponseDataBase(data) {
        var article = {};
        article.authorusername = data[0].authorusername;
        article.title = data[0].title;
        article.content = data[0].content;
        article.date = data[0].date;
        article.rating = data[0].rating;
        article.idArticle = data[0].idArticle;
        article.comments = [];
        article.usersNameRating = [];
        var idComments = [];
        data.forEach(function(item, index) {
            var comment = {};
            if (idComments.indexOf(item.idComment) === -1 && item.idComment) {
                comment.username = item.username;
                comment.text = item.text;
                comment.link = item.link;
                comment.date = item.datecomment;
                article.comments.push(comment);
                idComments.push(item.idComment);
            }
            if (article.usersNameRating.indexOf(item.namerating) === -1 && item.namerating) {
                article.usersNameRating.push(item.namerating);
            }
        });
        return article;
    }

    function incrementCountArticles(username, res) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount, user.articleCount + 1, username,
                function() {}, errorHandler(res));
        }, errorHandler(res));
    }

    function decrementCountArticle(username, res) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount, user.articleCount - 1, username,
                function() {}, errorHandler(res));
        }, errorHandler(res));
    }

    function decrementCountComment(username, res) {
        User.getUser(username, true, function(user) {
            User.updateUser(user.email, user.commentCount - 1, user.articleCount, username,
                function() {}, errorHandler(res));
        }, errorHandler(res));
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
        }, errorHandler(res));

    });

    app.get('/api/articles/:id', function(req, res) {
        if (req.params.id === 'random') {
            Article.getArticles('date', inf, 0, function(articles) {
                var randomNumber = Math.floor(Math.random() * (articles.length));
                Article.getArticle(articles[randomNumber].idArticle, function(data) {
                    var article = parseResponseDataBase(data);
                    var response = {
                        status: 'OK',
                        article: article
                    }
                    res.json(response);
                }, errorHandler(res));
            }, errorHandler(res))

        } else {
            Article.getArticle(req.params.id, function(data) {
                var article = parseResponseDataBase(data);
                var response = {
                    status: 'OK',
                    article: article
                }
                res.json(response);
            }, errorHandler(res));

        }

    });


    app.post('/api/articles', isLogged, function(req, res) {
        var newArticle = {};

        newArticle.authorusername = req.user.username;
        newArticle.title = req.body.title;
        newArticle.rating = 0;
        newArticle.date = new Date();
        newArticle.content = req.body.content || '';

        Article.createArticle(newArticle, function(article) {
            incrementCountArticles(req.user.username, res);
            var response = {
                status: 'OK',
                article: article
            }
            return res.json(response);
        }, errorHandler(res));

    });

    app.put('/api/articles/:id', isLogged, function(req, res) {
        Article.getArticle(req.params.id, function(article) {
            var rating;
            if (typeof req.body.rating !== 'undefined') {
                rating = +req.body.rating;
            } else {
                rating = article[0].rating;
            }

            var update = function() {
                Article.updateArticle(rating, req.params.id, function() {
                    Article.getArticle(req.params.id, function(data) {
                        var article = parseResponseDataBase(data);
                        var response = {
                            status: 'OK',
                            article: article
                        }
                        return res.json(response);
                    }, errorHandler(res));

                }, errorHandler(res));
            }

            if (typeof req.body.usersRating !== 'undefined') {
                Article.usersRating(req.body.usersRating, req.params.id, function() {}, errorHandler(res));
            }

            if (typeof req.body.comment !== 'undefined') {
                req.body.comment.username = req.user.username;
                req.body.comment.date = new Date();
                Article.createComment(req.body.comment, req.params.id, function() {
                    incrementCountComments(req.user.username, res);
                    update();
                }, errorHandler(res));
            } else {
                update();
            }

        });
    });

    app.delete('/api/articles/:id', isLogged, function(req, res) {
        Article.getArticle(req.params.id, function(data) {
            var article = parseResponseDataBase(data);
            decrementCountArticle(article.authorusername, res);
            article.comments.forEach(function(item, index) {
                decrementCountComment(item.username, res);
            });
        }, errorHandler(res));

        Article.deleteArticle(req.params.id, function() {
            var response = {
                status: 'OK'
            }
            return res.json(response);
        }, errorHandler(res));
    });
}
