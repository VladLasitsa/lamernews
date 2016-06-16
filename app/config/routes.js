var users = require('../controllers/users.js');
var articles = require('../controllers/articles.js');

module.exports = function(passport, app) {



    app.get('/', function(req, res) {
        res.send('hello world');
    });

    app.get('/register', function(req, res) {
        res.send("hello");
    });

    app.get('/users', function(req, res) {
        res.redirect('/users/' + req.user.username);
    });

    app.post('/register', passport.authenticate('registred', {
        successRedirect: '/users',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/users',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    require('../controllers/users.js')(app);
    require('../controllers/articles.js')(app);

};
