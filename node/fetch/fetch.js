var TimerJob = require('timer-jobs');
var jobTime = 5000;   // set the time in ms
var sportsLive = require('sports-live');
var team = 'Atletico Mineiro';
var buffer;
var request = require('request');


var fetchGoals = new TimerJob({interval: jobTime}, function(done){

	sportsLive.getAllMatches("soccer", function(err, matches){

		if(err){
			console.log(err.message);}
		else{
			for (i = 0; i < matches.length; i++) {
				if (matches[i].team1 == team || matches[i].team2 == team){
					

					if(buffer != matches[i].currentStatus){
						buffer = matches[i].currentStatus;
						console.log('new status in this game!');
						console.log(matches[i].currentStatus);						
						request.post('http://localhost:3000',{
							form:{team:'galo',
								message:matches[i].currentStatus}
						} , function (error, response, body) {
						  console.log('error:', error); // Print the error if one occurred
						  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
						  console.log('body:', body); // Print the HTML for the Google homepage.
						});

					}
				}

			}	
		}


	});


   console.log('...');
   done();

});


fetchGoals.start();

			
