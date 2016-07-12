'use strict';

var bcrypt = require('bcrypt-nodejs');
var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:123456@localhost:5432/databaseForWorldJS";
var db = pgp(connectionString);

module.exports = {

    getUser: function(username, check, callback) {
        if (check) {
            db.one("SELECT * FROM users WHERE username=$1", [username]).then(function(data) {
                callback(data);
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
        } else {
            db.one("SELECT username, email FROM users WHERE username=$1", [username]).then(function(data) {
                callback(data);
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
        }

    },

    createUser: function(user, callback) {
        db.none("INSERT INTO users (username,password," +
            "email, \"registrationDate\", \"commentCount\", \"articleCount\") " +
            "VALUES ($1,$2,$3,$4,$5,$6)", [user.username, user.password,
                user.email, user.registrationDate,
                user.commentCount, user.articleCount
            ]).then(function() {
            callback()
        }).catch(function(err) {
            console.log(err);
        }).finally(function() {
            pgp.end();
        });
    },

    updateUser: function(email, commentCount, articleCount, username, callback) {
        db.none("UPDATE users SET email=$1, \"commentCount\"=$2, \"articleCount\"=$3" +
                " WHERE username=$4", [email, commentCount, articleCount, username])
            .then(function() {
                callback();
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    deleteUser: function(username) {
        db.none("DELETE FROM users WHERE username=$1", username)
            .then(function() {
                callback();
            }).catch(function(err) {
                console.log(err);
            }).finally(function() {
                pgp.end();
            });
    },

    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: function(password, passwordInBase) {
        return bcrypt.compareSync(password, passwordInBase);
    }
};
