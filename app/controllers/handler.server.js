'use strict';
var request = require('request');
var Search = require('../models/Search.js');
var GoogleUrl = require( 'google-url' );

function Handler () {
	
	// e.g. https://fcc-api-basejumps-stepang.c9users.io
	this.fileAnalyse = function(req, res) {
		var size = req.file.size;
		require('fs').unlinkSync(req.file.path);
		res.json({fileSize: size});
	};
	
	// e.g. https://fcc-api-basejumps-stepang.c9users.io/api/urlshorten/https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fgoogle-url
	this.shortenUrl = function(req, res) {
		var googleUrl = new GoogleUrl( { key: process.env.GOOGLE_API_KEY });
		googleUrl.shorten( req.params.url, function( err, shortUrl ) {
			if(err) throw err;
			res.json({shortUrl: shortUrl});
		});
	};
	
	// e.g https://fcc-api-basejumps-stepang.c9users.io/api/timestamp/January%201,%202016
	this.timestamp =  function(req, res) {
		var timestamp = parseInt(req.params.input, 10);
		var datetime = timestamp ? timestamp * 1000 : Date.parse(req.params.input);
		res.json({timestamp: datetime ? datetime / 1000 : null, datestring: datetime ? new Date(datetime).toDateString() : null});
	};

	// e.g. https://fcc-api-basejumps-stepang.c9users.io/api/imagesearch/lolcats%20funny?offset=10
	this.imageSearch = function (req, res) {
		
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
	      		throw err ? err : result.statusCode;
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
	      		
  				Search.create({ term: req.params.searchterm }, function (err, result) { if (err) { throw err; } });
	      		res.json(output);
	      	}
	  	});
	};

	// e.g. https://fcc-api-basejumps-stepang.c9users.io/api/latest/imagesearch/
	this.getSearches = function(req, res) {
		Search.find({ }).sort({ 'when': 'desc'}).limit(10).exec(function (err, result) { if (err) { throw err; } res.json(result); });			
	};
}
module.exports = Handler;
