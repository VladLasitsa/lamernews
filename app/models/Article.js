'use strict';

var promise = require('bluebird');
var wrapper = require('./wrapperInPostgreSql');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:123456@localhost:5432/databaseForWorldJS";
var db = pgp(connectionString);
var date = 6;
var rating = 3;

module.exports = {

    getArticles: function(sortType, count, startIndex, callback) {
        var sort;
        if (sortType === 'date') {
            sort = date;
        } else if (sortType === 'rating') {
            sort = rating;
        }
        var promisePostgre = db.any("SELECT * FROM articles ORDER BY $1 DESC" +
            " LIMIT $2 OFFSET $3", [sort, count, startIndex]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    getArticle: function(id, callback) {
        var query = "SELECT articles.authorusername, articles.title, articles.content, " +
            "articles.date, articles.rating, articles.\"idArticle\", comments.username, " +
            "comments.text, comments.link, comments.date AS datecomment, comments.\"idComment\", " +
            "\"usersRating\".username AS namerating FROM articles LEFT OUTER JOIN comments " +
            "ON comments.\"idArticle\" = articles.\"idArticle\" LEFT OUTER JOIN \"usersRating\" " +
            "ON \"usersRating\".id = articles.\"idArticle\" WHERE articles.\"idArticle\"=$1";
        var promisePostgre = db.any(query, id);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    createArticle: function(article, callback) {
        var promisePostgre = db.none("INSERT into articles (authorusername,title," +
            " rating, date, content)" +
            "values ($1,$2,$3, $4, $5)", [article.authorusername,
              article.title, article.rating, article.date, article.content]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    updateArticle: function(rating, id, callback) {
        var promisePostgre = db.none("UPDATE articles SET rating=$1" +
            " where \"idArticle\"=$2", [rating, id]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    deleteArticle: function(id, callback) {
        var promisePostgre = db.none("DELETE FROM articles WHERE \"idArticle\"=$1", [id]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    createComment: function(comment, idArticle, callback) {
        var promisePostgre = db.none("INSERT into comments (username,text," +
            "link, date, \"idArticle\")" +
            "values ($1,$2,$3,$4,$5)", [
                comment.username,
                comment.text,
                comment.link,
                comment.date,
                idArticle
            ]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    },

    usersRating: function(username, id, callback) {
        var promisePostgre = db.none("INSERT into \"usersRating\" (username,id)" +
            "values ($1,$2)", [username, id]);
        wrapper.wrapperInPostgre(promisePostgre, callback);
    }
};
