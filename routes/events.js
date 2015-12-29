"use strict"

var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');

module.exports = router;

router.get('/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.find({}, function (err, events) {
		if (err) { console.log(err); }
		return res.send(JSON.stringify(events));	
	});
});

router.get('/:event', function (req, res) {
	console.log(1);
	res.setHeader('Content-Type', 'application/json');
	Event.find({
		title: req.params.event
	}, function (err, obj) {
		console.log(2);
		console.log(err);
		console.log(obj);
		if (err) { console.log(err); }
		if (obj && obj.length > 0) {
			return res.send(JSON.stringify(obj));
		} else {
			Event.create({
				title: req.params.event
			}, function (err, obj) {
				console.log(obj);
				if (err) { console.log(err); }
				return res.send(JSON.stringify(obj));
			});
		}
	});
});