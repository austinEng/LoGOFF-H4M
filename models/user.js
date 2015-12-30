"use strict"
var mongoose = require('mongoose');
var User = require('./event')
require('mongo-relation');

var UserSchema = new mongoose.Schema({
	userid: {
		type: Number,
		required: true,
		index: true
	},
	events: [mongoose.Schema.ObjectId]
});

UserSchema.hasMany('Event', {through: 'events'});

UserSchema.statics.findOrCreate = function(params, cb) {
	var schema = this;
	schema.findOne(params, function (err, user) {
		if (err) {
			cb(err);
		} else {
			if (user) {
				cb(null, user);
			} else {
				schema.create(params, function (err, user) {
					if (err) {
						cb(err);
					} else {
						if (user) {
							cb(null, user);
						}
					}
				});
			}
		}
	});
}

module.exports = mongoose.model('User', UserSchema);