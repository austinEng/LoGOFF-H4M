"use strict"

var express = require('express');
var router = express.Router();
var EventDiscussion = require('../models/eventDiscussion.js');
var User = require('../models/user.js');

module.exports = router;

router.post('/create', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.find({
		_id: req.query._id
	}, function (err, ev) {
		if (err) console.log(err);
		if (ev) {
			ev.discussions.create(req.body, function (err, post) {
				if (err) console.log(err);
				return res.send(JSON.stringfy(post));
			});
		} else {
			return res.send({});
		}
	});
	
});

router.post('/update', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	EventDiscussion.findOneAndUpdate({_id: req.query._id}, {
		content: req.body.content
	}, {upsert: true}, function (err, ev) {
		if (err) console.log(err);
		return res.send(ev);
	});
});

router.post('/delete', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	EventDiscussion.remove({_id: req.query._id}, function(err) {
		if (err) {
			console.log(err);
			return res.send(false);
		}
		return res.send(true);
	})
});