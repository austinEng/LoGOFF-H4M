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
	creator: mongoose.Schema.ObjectId,
	attendees: [mongoose.Schema.ObjectId],
	discussions: [mongoose.Schema.ObjectId],
	datetime: Date,
	location: String,
	description: String,
	tags: [String],
	created_at: Date,
	updated_at: Date
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