var localStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

module.exports = function(passport) {

    passport.use('registred', new localStrategy(
        function(username, password, done) {

            User.findOne({
                'username': username
            }, function(err, user) {
                if (user) {
                    console.log("User alredy exists");
                    return done(null, false, {
                        message: "User alredy exists"
                    });
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.registrationDate = new Date();
                    newUser.commentCount = 0;
                    newUser.articleCount = 0;
                    newUser.email = '';
                    newUser.save(function(err) {
                        if (err) {
                            console.log('Server Error');
                            return done(null, false, {
                                message: 'Server Error'
                            });
                        }
                        console.log("OK");
                        return done(null, newUser);
                    });
                }
            });
        }));

    passport.use('signup', new localStrategy(function(username, password, done) {
        User.findOne({
            'username': username
        }, function(err, user) {
            if (!user.validPassword(password)) {
                done(null, false);
            }
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(userId, done) {
        User.findById(userId, function(err, user) {
            done(err, user);
        });
    });
}
