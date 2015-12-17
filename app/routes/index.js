'use strict';

var Handler = require(process.cwd() + '/app/controllers/handler.server.js');

module.exports = function (app) {

	var handler = new Handler();
	
	app.route('/')
		.get(function (req, res) { res.sendFile(process.cwd() + '/public/index.html');});

	var upload = require('multer')({ dest: './uploads' });
	app.route('/api/fileanalyse')
		.post(upload.single('0'), handler.fileAnalyse);

	app.route('/api/urlshorten/:url')
		.get(handler.shortenUrl);
	
	app.route('/url/:id')
		.get(handler.unShortenUrl);
		
	app.route('/api/timestamp/:input')
		.get(handler.timestamp);
		
	app.route('/api/imagesearch/:searchterm')
		.get(handler.imageSearch);
		
	app.route('/api/latest/imagesearch/')
		.get(handler.getSearches);
		
	app.route('/api/whoami/')
		.get(handler.whoAmI);
};
