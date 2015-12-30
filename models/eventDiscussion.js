"use strict"
var mongoose = require('mongoose');
var Event = require('./event')
require('mongo-relation');

var DiscussionSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	author: mongoose.Schema.ObjectId
});

DiscussionSchema.belongsTo('User', {through: 'author'});