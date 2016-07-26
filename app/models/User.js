'use strict';

var bcrypt = require('bcrypt-nodejs');
var promise = require('bluebird');
var wrapper = require('./wrapperInPostgreSql');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:123456@localhost:5432/databaseForWorldJS";
var db = pgp(connectionString);

module.exports = {

    getUser: function(username, check, callback, errorCallback) {
        if (check) {
            var promisePostgre = db.one("SELECT * FROM users WHERE username=$1", [username]);
            wrapper.wrapperInPostgre(promisePostgre, callback, errorCallback);
        } else {
            var promisePostgre = db.one("SELECT username, email FROM users WHERE username=$1", [username]);
            wrapper.wrapperInPostgre(promisePostgre, callback, errorCallback);
        }

    },

    createUser: function(user, callback, errorCallback) {
        var promisePostgre = db.none("INSERT INTO users (username,password," +
            "email, \"registrationDate\", \"commentCount\", \"articleCount\") " +
            "VALUES ($1,$2,$3,$4,$5,$6)", [user.username, user.password,
                user.email, user.registrationDate,
                user.commentCount, user.articleCount
            ]);
        wrapper.wrapperInPostgre(promisePostgre, callback, errorCallback);
    },

    updateUser: function(email, commentCount, articleCount, username, callback, errorCallback) {
        var promisePostgre = db.none("UPDATE users SET email=$1, \"commentCount\"=$2, \"articleCount\"=$3" +
            " WHERE username=$4", [email, commentCount, articleCount, username]);
        wrapper.wrapperInPostgre(promisePostgre, callback, errorCallback);
    },

    deleteUser: function(username, callback, errorCallback) {
        var promisePostgre = db.none("DELETE FROM users WHERE username=$1", username);
        wrapper.wrapperInPostgre(promisePostgre, callback, errorCallback);
    },

    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: function(password, passwordInBase) {
        return bcrypt.compareSync(password, passwordInBase);
    }
};
