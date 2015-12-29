"use strict"

var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');

module.exports = router;

router.get('/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.find({}, function (err, events) {
		res.send(JSON.stringify(events));	
	});
});

router.get('/:event', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Event.find({
		title: req.params.event
	}, function (err, obj) {
		if (obj) {
			return res.send(JSON.stringify(obj));
		} else {
			Event.create({
				title: req.params.event
			}, function (err, obj) {
				return res.send(JSON.stringify(obj));
			});
		}
	});
});