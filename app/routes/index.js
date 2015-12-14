'use strict';

var path = process.cwd();
var Handler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app) {

	var handler = new Handler();
	
	app.route('/api/urlshorten/:url')
		.get(handler.shortenUrl);
		
	app.route('/api/timestamp/:input')
		.get(handler.timestamp);
		
	app.route('/api/imagesearch/:searchterm')
		.get(handler.imageSearch);
		
	app.route('/api/latest/imagesearch/')
		.get(handler.getSearches);
};
