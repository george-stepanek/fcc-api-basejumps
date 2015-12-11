'use strict';

var request = require('request');

function Handler () {

	// e.g. https://fcc-api-basejumps-stepang.c9users.io/api/imagesearch/lolcats%20funny?offset=10
	this.getImageSearch = function (req, res) {
		
		var url = "https://www.googleapis.com/customsearch/v1?searchType=image&key=" + process.env.GOOGLE_API_KEY +
			"&cx=" + process.env.GOOGLE_SEARCH_ENGINE + "&q=" + req.params.searchterm;
			
		if(req.query.offset) {
			var offset = parseInt(req.query.offset, 10);
			if(!isNaN(offset) && offset >= 0) {
				url += "&start=" + (offset + 1);
			}
		}
			
	  	request.get(url, {json: true}, function(err, result, body) {
	      	if (err || result.statusCode != 200) {
	      		throw err;
	      	} else {
	      		var output = [];
	      		for(var i = 0; i < body.items.length; i++) {
	      			output.push({ 
	      				url: body.items[i].link, 
	      				snippet: body.items[i].snippet, 
	      				thumbnail: body.items[i].image.thumbnailLink,
	      				context: body.items[i].image.contextLink
	      			});
	      		}
	      		res.json(output);
	      	}
	  	});
	};
}
module.exports = Handler;
