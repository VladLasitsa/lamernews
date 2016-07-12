'use strict';

var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:123456@localhost:5432/databaseForWorldJS";
var db = pgp(connectionString);

module.exports = {

    getArticles: function(sortType, count, startIndex, callback) {
        var sort;
        if (sortType === 'date') {
            sort = 7;
        } else if (sortType === 'rating') {
            sort = 4;
        }
        db.any("SELECT * FROM articles ORDER BY $1 DESC" +
                " LIMIT $2 OFFSET $3", [sort, count, startIndex])
            .then(function(data) {
                callback(data);
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    getArticle: function(id, callback) {
        var comments = [];
        var userName = [];
        var article = {};
        db.one("SELECT * FROM articles WHERE \"idArticle\"=$1", id)
            .then(function(data) {
                article = data;
                db.any("SELECT * FROM comments WHERE \"idArticle\"=$1", id)
                    .then(function(data) {
                        comments = data;
                        db.any("SELECT * FROM \"usersRating\" WHERE \"id\"=$1", id)
                            .then(function(data) {
                                data.forEach(function(item, index) {
                                    userName.push(item.username);
                                });

                                callback(article, comments, userName);
                            }).
                        catch(function(err) {
                            console.log(err);
                        }).finally(function() {
                            pgp.end();
                        });
                    }).catch(function(err) {
                        console.log(err);
                    }).finally(function() {
                        pgp.end();
                    });
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    createArticle: function(article, callback) {
        db.none("INSERT into articles (authorusername,title," +
                "link, rating, date)" +
                "values ($1, $2,$3, $4, $5)", [article.authorusername, article.title,
                    article.link, article.rating, article.date
                ])
            .then(function() {
                callback();
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    updateArticle: function(rating, id, callback) {
        db.none("UPDATE articles SET rating=$1" +
            " where \"idArticle\"=$2", [rating, id]).then(function() {
            callback();
        }).catch(function(err) {
            console.log(err);
        }).finally(function() {
            pgp.end();
        });
    },

    deleteArticle: function(id, callback) {
        db.none('DELETE FROM comments WHERE \"idArticle\"=$1', [id])
            .then(function() {
                db.none('DELETE FROM \"usersRating\" WHERE \"id\"=$1', id)
                    .then(function() {
                        db.none("DELETE FROM articles WHERE \"idArticle\"=$1", [id])
                            .then(function() {
                                callback();
                            }).catch(function(err) {
                                console.log(err);
                            }).finally(function() {
                                pgp.end();
                            });
                    }).catch(function(err) {
                        console.log(err);
                    }).finally(function() {
                        pgp.end();
                    });
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });

    },

    createComment: function(comment, idArticle, callback) {
        db.none("INSERT into comments (username,text," +
                "link, date, \"idArticle\")" +
                "values ($1,$2,$3,$4,$5)", [
                    comment.username,
                    comment.text,
                    comment.link,
                    comment.date,
                    idArticle
                ])
            .then(function() {
                callback();
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    usersRating: function(username, id, callback) {
        db.none("INSERT into \"usersRating\" (username,id)" +
            "values ($1,$2)", [username, id]).then(function() {
            callback();
        }).catch(function(err) {
            console.log(err);
        }).finally(function() {
            pgp.end();
        });

    }

};
