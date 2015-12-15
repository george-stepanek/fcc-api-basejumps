'use strict';

var Handler = require(process.cwd() + '/app/controllers/handler.server.js');

module.exports = function (app) {

	var handler = new Handler();
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});
	
	app.route('/api/imageanalyse')
		.post(handler.imageAnalyse);

	app.route('/api/urlshorten/:url')
		.get(handler.shortenUrl);
		
	app.route('/api/timestamp/:input')
		.get(handler.timestamp);
		
	app.route('/api/imagesearch/:searchterm')
		.get(handler.imageSearch);
		
	app.route('/api/latest/imagesearch/')
		.get(handler.getSearches);
};
