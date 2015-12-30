"use strict";

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose = require('mongoose');

var express = require('express');
var app = express();
var http = require('http').Server(app);
app.set('port', process.env.PORT || 3000);

var config = require('./config.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: config.setup.cookie_secret, saveUninitialized: true, resave: true}));

app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});

app.use('/events', require('./routes/events.js'));
app.use('/users', require('./routes/users.js'));
app.use('/discussions', require('./routes/eventDiscussion.js'));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/logoff', function(err) {
  if(!err) {
    console.log('Connected to database');
  } else {
    return;
  }

  // start server
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});