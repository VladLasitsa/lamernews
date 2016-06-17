var UserModel = require('../models/User.js');

module.exports = function(app) {

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    app.get('/users/:username', function(req, res) {
        var name = req.params.username;
        if (req.isAuthenticated()) {
            UserModel.findOne({
                username: name
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
            });
        } else {
            UserModel.findOne({
                username: name
            }, {
                username: 1,
                email: 1,
                articleCount: 1
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

    app.put('/users/:username', isLogged, function(req, res) {
        var name = req.params.username;
        UserModel.findOne({
            'username': name
        }, function(err, user) {
            if (!err) {
                user.email = req.body.email || user.email;
                user.save(function(err) {
                    if (err) {
                        return res.send("Error");
                    } else {
                        return res.send({
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

    app.delete('/users/:username', isLogged, function(req, res) {
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
