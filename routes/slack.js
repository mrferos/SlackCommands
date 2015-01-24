var express = require('express');
var router = express.Router();
var config = require('../config');

router.post('/ualookup', function(req, res, next) {
	var http = require('http');
	var ua = req.body.text;
	var options = {
		host: 'useragentapi.com',
		path: '/api/v2/json/'+config.useragentapi.key+'/'+encodeURIComponent(ua)
	};

	console.log('/api/v2/json/'+config.useragentapi.key+'/'+encodeURIComponent(ua));
	var callback = function(response) {
		var str = ''
  		response.on('data', function (chunk) {
    			str += chunk;
  		});

  		response.on('end', function () {
    			uaData = JSON.parse(str);
			message = "OS: " + uaData.platform_name + "\nDevice Type: ";
			message += uaData.platform_type + "\nOS Version: " + uaData.platform_version;
			message += "\nBrowser Name: " + uaData.browser_name;
			message += "\nBrowser Version: " + uaData.browser_version;
			res.send(message);
  		});
	};
	
	
	http.request(options, callback).end();	
});

module.exports = router;
