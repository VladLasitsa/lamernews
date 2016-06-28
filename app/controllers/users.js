var UserModel = require('../models/User.js');

module.exports = function(app) {
      'use strict';
    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    app.get('/api/users/:username', function(req, res) {
        var name = req.params.username;
        if (req.isAuthenticated()) {
            UserModel.findOne({
                username: name
            }, function(err, user) {
                if (!err) {

                    return res.json({
                        status: 'OK',
                        user: user
                    });
                } else {
                    res.statusCode = 500;
                    return res.json({
                        error: 'Server error'
                    });
                }
            });
        } else {
            UserModel.findOne({
                username: name
            }, {
                username: 1,
                email: 1
            }, function(err, user) {
                if (!err) {
                    return res.send({
                        status: 'OK',
                        user: user
                    });
                } else {
                    res.statusCode = 500;
                    return res.send({
                        error: 'Server error'
                    });
                }
            })
        }

    });

    app.put('/api/users/:username', isLogged, function(req, res) {
        var name = req.params.username;
        UserModel.findOne({
            'username': name
        }, function(err, user) {
            if (!err && req.user.username === name) {
                user.email = req.body.email || user.email;
                user.save(function(err) {
                    if (err) {
                        return res.send("Error");
                    } else {
                        return res.json({
                            status: 'OK',
                            user: user
                        });
                    }

                });

            } else {
                res.statusCode = 500;
                return res.send({
                    error: 'Server error'
                });
            }
        });
    });

    app.delete('/api/users/:username', isLogged, function(req, res) {
        var name = req.params.username;
        UserModel.findOne({
            'username': name
        }, function(err, user) {
            if (!user) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }
            return user.remove(function(err) {
                if (!err) {
                    return res.redirect('/');
                } else {
                    res.statusCode = 500;
                    return res.send({
                        error: 'Server error'
                    });
                }
            })
        });
    });
}
