var ArticleModel = require('../models/Article.js');
var UserModel = require('../models/User.js');

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

    function incrementCountComments(comment, username) {
        UserModel.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return res.send({
                    error: 'Server Error'
                });
            } else {
                user.commentCount = user.commentCount + 1;
                user.save(function(err) {
                    if (err) {
                        return res.send({
                            error: 'Server Error: don\'t update user comments count'
                        });
                    }
                });
            }
        });
    }

    function search(comments, comment) {

        comments.forEach(function(item, index) {
            if (item._id.equals(comment.link)) {
                return item.comments.push(comment);
            } else {
                if (item.comments.length !== 0) {
                    return search(item.comments, comment);
                } else {
                    return;
                }
            }
        });
    }

    app.get('/api/articles/:startIndex/:count', function(req, res) {
        var limit = +req.params.count;
        var startIndex = +req.params.startIndex;
        var sort = req.query.sort;
        ArticleModel.find({}, {
                comments: 0
            }).sort('-' + sort)
            .skip(startIndex)
            .limit(limit)
            .exec(function(err, articles) {
                if (err) {
                    return res.send({
                        error: 'Server error' + err
                    });
                } else {
                    var response = {
                        status: 'OK',
                        articles: articles
                    }
                    res.json(response);
                }
            });
    });

    app.get('/api/articles/:id', function(req, res) {
        if (req.params.id === 'random') {
            ArticleModel.find(function(err, articles) {
                if (err) {
                    return res.send({
                        status: "ERROR"
                    });
                }
                var randomNumber = Math.floor(Math.random() * (articles.length));
                var response = {
                    status: 'OK',
                    article: articles[randomNumber]
                }
                res.json(response);

            });
        } else {
            ArticleModel.findById(req.params.id, function(err, article) {
                if (err) {
                    res.send({
                        status: "ERROR",
                        error: 'Articles with this id don\'t exists'
                    });
                } else {
                    var response = {
                        status: 'OK',
                        article: article
                    }
                    res.json(response);
                }
            });
        }

    });


    app.post('/api/articles', isLogged, function(req, res) {
        var newArticle = new ArticleModel();
        var comments = req.body.comments;

        newArticle.authorusername = req.user.username;
        newArticle.title = req.body.title;
        newArticle.link = '/articles/' + newArticle._id;
        newArticle.rating = 0;
        newArticle.date = Date.now();
        newArticle.comments = comments;

        newArticle.save(function(err) {
            if (err) {
                return res.send({
                    error: "Error: don't save article"
                });
            } else {
                UserModel.findOne({
                    username: req.user.username
                }, function(err, user) {
                    user.articleCount = user.articleCount + 1;
                    user.save(function(err) {
                        if (err) {
                            return res.send({
                                error: 'Server Error'
                            });
                        }
                    });
                });
                var response = {
                    status: 'OK',
                    article: newArticle
                }
                return res.json(response);
            }
        });
    });

    app.put('/api/articles/:id', isLogged, function(req, res) {
        ArticleModel.findOne({
            '_id': req.params.id
        }, function(err, article) {
            if (err) {
                return res.send({
                    error: 'Server Error'
                });
            } else {
                article.rating = req.body.rating || article.rating;
                if(typeof req.body.usersRating !== 'undefined') {
                  article.usersRating.push(req.body.usersRating);
                }

                if (typeof req.body.comment !== 'undefined') {
                    req.body.comment.username = req.user.username;
                    if (req.body.comment.link === '') {
                        req.body.comment.date = new Date();
                        article.comments.push(req.body.comment)
                    } else {
                        search(article.comments, req.body.comment);
                    }
                    incrementCountComments(req.body.comment, req.user.username);
                }

                article.save(function(err) {
                    if (err) {
                        return res.send({
                            error: 'Error: don\'t update article'
                        });
                    } else {
                        var response = {
                            status: 'OK',
                            article: article
                        }
                        return res.json(response);
                    }
                });
            }
        });
    });

    app.delete('/api/articles/:id', isLogged, function(req, res) {

        ArticleModel.findOne({
            '_id': req.params.id
        }, function(err, article) {
            if (err) {
                return res.send({
                    error: "Server error"
                });
            } else {
                if (req.user.username === article.authorusername) {
                    article.remove(function(err) {
                        if (err) {
                            return res.send({
                                status: "ERROR",
                                error: "Error: don't remove article"
                            });
                        } else {
                            var response = {
                                status: 'OK'
                            }
                            return res.json(response);
                        }
                    });
                } else {
                    var response = {}
                    return res.send({
                        status: "ERROR",
                        error: "You don't delete articles, becose you don't her creater"
                    })
                }

            }
        });
    });
}
