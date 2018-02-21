// this script simulates a goal from atletico mg for test purposes

var request = require('request');

request.post('http://localhost:3000',
	{form:
		{team:'galo', message:"goal from galo : test message"}},
			function (error, response, body) {
				console.log('error:', error); // Print the error if one occurred
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				console.log('body:', body); // Print the HTML for the Google homepage.
			});






