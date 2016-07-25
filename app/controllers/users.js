var User = require('../models/User.js');

module.exports = function(app) {
    'use strict';

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
          res.status(203).json({
            status: "ERROR",
            description: "User is not authentificated"
          });
        }
    }

    app.get('/api/users/:username', function(req, res) {
        var name = req.params.username;
        if (req.isAuthenticated()) {
            User.getUser(name, true, function(user) {
                return res.json({
                    status: 'OK',
                    user: user
                });
            });

        } else {
            User.getUser(name, false, function(user) {
                return res.json({
                    status: 'OK',
                    user: user
                });
            });

        }

    });

    app.put('/api/users/:username', isLogged, function(req, res) {
        var name = req.params.username;

        User.getUser(name, true, function(user) {
          console.log(req.body);
            var email = req.body.email || user.email;
            var commentCount = req.body.commentCount || user.commentCount;
            var articleCount = req.body.articleCount || user.articleCount;

            if (req.user.username === name) {
                User.updateUser(email, commentCount, articleCount, name, function(user) {
                    User.getUser(name, true, function(user) {
                        return res.json({
                            status: 'OK',
                            user: user
                        });
                    });

                });

            }
        });
    });

    app.delete('/api/users/:username', isLogged, function(req, res) {
        var name = req.params.username;
        if (req.user.username === name) {
            var user = User.deleteUser(name);

            return res.json({
                status: 'OK'
            });
        }
    });
}
