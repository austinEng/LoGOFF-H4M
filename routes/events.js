"use strict"

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');
var User = require('../models/user.js');

module.exports = router;

router.get('/', function (req, res) {
	if (req.session && req.session.user) {
		Event.find({
			_id: {$in: req.session.user.events}
		}, function (err, events) {
			if (err) { console.log(err); }
			return res.send(JSON.stringify(events));
		});
	} else {
		console.log("No user available");
	}
});

router.get('/get/:_id', function (req, res) {
	Event.findOne({_id: req.params._id}, function (err, ev) {
		return res.send(JSON.stringify(ev));
	});
});

router.get('/feed', function (req, res) {
	var ids = req.query.ids.split(',');

	var query = User.find({});
	query.where('userid').in(ids);
	query.exec(function (err, users) {

		if (err) console.log(err);
		var eids = []
		for (var i = 0; i < users.length; i++) {
			eids = eids.concat(users[i].events);
		}
		Event.find({
			_id: {$in : eids}
		}, function (err, events) {
			if (err) console.log(err);
			return res.send(JSON.stringify(events));
		});
	});
});

router.post('/create', function (req, res) {
	if (req.session && req.session.user) {
		Event.create({
			title: req.body.title,
			creator: req.session.user._id,
			attendees: [req.session.user._id],
			datetime: req.body.datetime,
			location: req.body.location,
			description: req.body.description,
			tags: req.body.tags
		}, function (err, ev) {
			if (err) console.log(err);
			req.session.user.events.push(ev._id);
			req.session.user.save(function (err) {
				if (err) console.log(err);
				return res.send(JSON.stringify(ev));
			});
		});
	} else {
		console.log("No user available");
	}
});

router.post('/update', function (req, res) {
	/*Event.findOneAndUpdate({_id: req.query._id}, req.body, {upsert: true}, function (err, ev) {
		if (err) console.log(err);
		return res.send(ev);
	});*/
	if (req.session && req.session.user) {
		req.session.user.events.find({_id: req.query._id}, function (err, events) {
			if (err) console.log(err);
			if (events && events.length > 0) {
				var ev = events[0];
				ev.title = req.body.title;
				ev.datetime = req.body.datetime;
				ev.location = req.body.location;
				ev.description = req.body.description;
				ev.tags = req.body.tags;
				ev.save(function (err, theEvent) {
					if (err) console.log(err);
					return res.send(theEvent);
				});
			}
		});
	} else {
		console.log("No user available");
	}
});

router.post('/delete', function (req, res) {
	/*Event.remove({_id: req.query._id}, function(err) {
		if (err) {
			console.log(err);
			return res.send(false);
		}
		return res.send(true);
	})*/
	if (req.session && req.session.user) {
		req.session.user.events.remove(req.query._id, function(err) {
			if (err) {
				console.log(err);
				return res.send(false);
			}
			return res.send(true);
		});
	} else {
		console.log("No user available");
	}
});