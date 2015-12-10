'use strict';

var path = process.cwd();
var Handler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app) {

	var handler = new Handler();
	
	app.route('/api/imagesearch/:searchterm')
		.get(handler.getImageSearch);
};
