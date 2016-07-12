var localStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

module.exports = function(passport) {
    'use strict';
    passport.use('registred', new localStrategy(
        function(username, password, done) {
            var userCheck = User.getUser(username);
            if (typeof userCheck === 'undefined') {
                var newUser = {};
                newUser.username = username;
                newUser.password = User.generateHash(password);
                newUser.registrationDate = new Date();
                newUser.commentCount = 0;
                newUser.articleCount = 0;
                newUser.email = '';
                User.createUser(newUser, function () {
                  User.getUser(username, true, function (user) {
                    return done(null, user)
                  });
                });

            } else {
                return done(null, null);
            }

        }));


    passport.use('signup', new localStrategy(function(username, password, done) {

         User.getUser(username, true, function (user) {
           if (!User.validPassword(password, user.password)) {
               return done(null, false);
           } else {
               return done(null, user);
           }
         });

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(userUsername, done) {
        User.getUser(userUsername, true, function (user) {
          done(null, user);
        });


    });
}
