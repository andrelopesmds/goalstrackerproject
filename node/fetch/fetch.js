var TimerJob = require('timer-jobs');
var jobTime = 5000;   // set the time in ms
var sportsLive = require('sports-live');
var team = 'Austria (W)';
var buffer;
var score;
var request = require('request');


var fetchGoals = new TimerJob({interval: jobTime}, function(done){

	sportsLive.getAllMatches("soccer", function(err, matches){

		if(err){
			console.log(err.message);}
		else{
			for (i = 0; i < matches.length; i++) {
				if (matches[i].team1 == team || matches[i].team2 == team){
					

					if(buffer != matches[i].currentStatus || score != matches[i].score){
						buffer = matches[i].currentStatus;
						score = matches[i].score;
						console.log('new status in this game!');
						console.log(matches[i].currentStatus);
						var msg = configMessage(matches[i]);						
						request.post('http://localhost:3000',{
							form:{team:'galo',
								message:msg}
						} , function (error, response, body) {
						  console.log('error:', error); // Print the error if one occurred
						  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
						  console.log('body:', body); 
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

			
function configMessage(data){
  
  if(data.currentStatus.includes(data.team1)){

    message = "Gol do "+data.team1+"!\n"+data.team1+" "+score+" "+data.team2;

  } else if (data.currentStatus.includes(data.team2)){

    message = "Gol do "+data.team2+"!\n"+data.team1+" "+score+" "+data.team2;

  } else {

    switch (data.currentStatus) {
      case 'Kick Off':
          message = "Começa o jogo!\n"+data.team1+" x "+data.team2;
          break;
      case 'Halftime':
          message = "Fim do primeiro tempo!\n"+data.team1+" x "+data.team2;
          break;
      case '2nd Half Started':
          message = "Começa o segundo tempo!\n"+data.team1+" x "+data.team2;
          break;
      case 'Match Postponed':
          message = "Jogo adiado!\n"+data.team1+" x "+data.team2;
          break;
      case 'Match Finished':
          message = "Fim de jogo!\n"+data.team1+" "+score+" "+data.team2;
          break;
      default:
          message = "Galo!";
    }
  }

  return message;

}
