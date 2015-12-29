"use strict"

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');
var User = require('../models/user.js');

module.exports = router;

router.get('/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.find({}, function (err, events) {
		if (err) { console.log(err); }
		return res.send(JSON.stringify(events));	
	});
});

router.get('/:id', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.findOne({_id: req.params.id}, function (err, ev) {
		return res.send(JSON.stringify(ev));
	});
});

router.post('/create', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var params = req.body;
	User.findOrCreate({
		userid: req.query.id
	}, function (err, user) {
		if (err) {
			console.log(err);
		}
		params.creator = user;
		Event.create(params, function (err, ev) {
			if (err) {
				console.log(err);
			}
			return res.send(JSON.stringify(ev));
		});
	});
});

router.post('/update', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.findOneAndUpdate({_id: req.query._id}, req.body, {upsert: true}, function (err, ev) {
		if (err) console.log(err);
		return res.send(ev);
	});
});

router.post('/delete', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.remove({_id: req.query._id}, function(err) {
		if (err) {
			console.log(err);
			return res.send(false);
		}
		return res.send(true);
	})
});