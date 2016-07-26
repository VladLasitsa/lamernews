
module.exports = function(passport, app) {
    'use strict';

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({
              status: "ERROR",
              description: "User is not authentificated"
            })
        }
    }

    app.use(function (req, res, next) {
       res.header('Access-Control-Allow-Credentials', true);
       next();
    });

    app.get('/api/register', function(req, res) {
        return res.status(401).json({
            status: "ERROR",
            description: "This is login exists"
        });
    });

    app.get('/api/users', isLogged, function(req, res) {
        res.redirect('/api/users/' + req.user.username);
    });

    app.post('/api/register', passport.authenticate('registred', {
        successRedirect: '/api/users',
        failureRedirect: '/api/register',
        failureFlash: true
    }));

    app.post('/api/signup', passport.authenticate('signup', {
        successRedirect: '/api/users',
        failureRedirect: '/api/signup',
        failureFlash: true
    }));

    app.get('/api/signup', function(req, res) {
        return res.status(401).json({
            status: "ERROR",
            description: "Wrong data"
        });
    });

    app.get('/api/logout', function(req, res) {
         req.logout();
         res.json({"user" : "logout"});
    });

    require('../controllers/users.js')(app);
    require('../controllers/articles.js')(app);

};
