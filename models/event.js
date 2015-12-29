"use strict"
var mongoose = require('mongoose');
var User = require('./user');
var EventDiscussion = require('./eventDiscussion');
require('mongo-relation');

var EventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	datetime: {
		type: Date
	},
	location: {
		type: String
	},
	description: {
		type: String
	},
	tags: {
		type: [String]
	},
	created_at: {
		type: Date
	},
	updated_at: {
		type: Date
	}
});

EventSchema.belongsTo('User', {through: 'creator'});
EventSchema.hasMany('User', {through: 'attendees'});
EventSchema.hasMany('EventDiscussion', {through: 'discussions'});

EventSchema.pre('save', function(next){
	var now = new Date();
	this.updated_at = now;
	if ( !this.created_at ) {
		this.created_at = now;
	}
	next();
});

module.exports = mongoose.model('Event', EventSchema);