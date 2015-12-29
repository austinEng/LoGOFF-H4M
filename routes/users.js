"use strict"

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

module.exports = router;

router.get('/current', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	User.findOrCreate({
		userid: req.query.id
	}, function (err, user) {
		if (err) {console.log(err);}
		return res.send(user);
	});
});
