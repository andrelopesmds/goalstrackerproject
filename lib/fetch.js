var TimerJob = require('timer-jobs');
var jobTime = 60000;   // set the time in ms
var sportsLive = require('sports-live');
var team = 'FC Ashdod';
var buffer;
var push = require('./push.js');

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
						push.send(matches[i].currentStatus);
					}
				}

			}	
		}


	});


   console.log('...');
   done();

});


fetchGoals.start();
