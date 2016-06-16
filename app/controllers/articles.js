var ArticleModel = require('../models/Article.js');
var UserModel = require('../models/User.js');

module.exports = function(app) {

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
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

    app.get('/articles/:startIndex/:count', function(req, res) {
        var limit = +req.params.count;
        var startIndex = +req.params.startIndex;

        ArticleModel.find().sort('-' + req.query.sort)
            .skip(startIndex)
            .limit(limit)
            .exec(function(err, articles) {
                if (err) {
                    return res.send({
                        error: 'Server error' + err
                    });
                } else {
                    return res.send({
                        status: 'OK',
                        articles: articles
                    })
                }
            });
    });

    app.get('/articles/:id', function(req, res) {
        ArticleModel.findById(req.params.id, function(err, article) {
            if (err) {
                res.send({
                    error: 'Articles with this id don\'t exists'
                });
            } else {
                res.send({
                    status: 'OK',
                    article: article
                });
            }
        });
    });

    app.get('/articles/random', function(req, res) {
        ArticleModel.find(function(err, articles) {
            if (err) {
                return res.send("Error");
            }
            var randomNumber = Math.floor(Math.random() * (articles.length - 1));
            return res.send({
                status: 'OK',
                article: articles[randomNumber]
            });
        });
    });

    app.post('/articles', isLogged, function(req, res) {
        var newArticle = new ArticleModel();
        var comments = req.body.comments;

        newArticle.authorusername = req.user.username;
        newArticle.title = req.body.title;
        newArticle.link = '/articles/' + newArticle._id;
        newArticle.rating = 0;
        newArticle.date = new Date();
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
                return res.send({
                    status: 'OK',
                    article: newArticle
                });
            }
        });
    });

    app.put('/articles/:id', isLogged, function(req, res) {
        ArticleModel.findOne({
            '_id': req.params.id
        }, function(err, article) {
            if (err) {
                return res.send({
                    error: 'Server Error'
                });
            } else {
                article.rating = req.body.rating || article.rating;
                if (req.body.comment.link === '') {
                    article.comments.push(req.body.comment)
                } else {
                    search(article.comments, req.body.comment);
                }
                incrementCountComments(req.body.comment, req.user.username);
                article.save(function(err) {
                    if (err) {
                        return res.send({
                            error: 'Error: don\'t update article'
                        });
                    } else {
                        return res.send({
                            status: 'OK',
                            article: article
                        });
                    }
                });
            }
        });
    });

    app.delete('/articles/:id', isLogged, function(req, res) {

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
                                error: "Error: don't remove article"
                            });
                        } else {
                            return res.send({
                                status: 'OK',
                            });
                        }
                    });
                } else {
                    return res.send({
                        error: "You don't delete articles, becose you don't her creater"
                    })
                }

            }
        });
    });
}
