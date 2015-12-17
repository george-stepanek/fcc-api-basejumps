'use strict';

var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('dotenv').load();
autoIncrement.initialize(mongoose.createConnection(process.env.MONGOLAB_URI));

var Url = new Schema({
	longUrl: String
});

Url.plugin(autoIncrement.plugin, 'Book');

module.exports = mongoose.model('Url', Url);
