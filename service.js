'use strict';
var routes = require('./app/config/routes.js');

var express = require('express');
var app = express();

var port = process.env.PORT || 1000;
var mongoose = require('mongoose');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());


app.use('/', express.static(__dirname + '/public'));


app.use(session({
    secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./app/config/passport.js')(passport);

require('./app/config/routes.js')(passport, app);

app.listen(port);
