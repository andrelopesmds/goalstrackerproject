var TimerJob = require('timer-jobs');
var jobTime = 5000;   // set the time in ms
var sportsLive = require('sports-live');
var team = 'Pontedera';
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

    var title = "Gol do "+data.team1+"!";
    var body = data.team1+" "+score+" "+data.team2;
    var icon = "images/ball.png";

  } else if (data.currentStatus.includes(data.team2)){

    var title = message = "Gol do "+data.team2+"!";
    var body = data.team1+" "+score+" "+data.team2;
    var icon = "images/ball.png";

  } else {

    switch (data.currentStatus) {
      case 'Kick Off':
          var title = "Começa o jogo!\n";
          var body = data.team1+" x "+data.team2;
          var icon = "images/field.png";
          break;
      case 'Halftime':
          var title = "Fim do primeiro tempo!\n";
          var body = data.team1+" "+score+" "+data.team2;
          var icon = "images/time.png";
          break;
      case '2nd Half Started':
          var title = "Começa o segundo tempo!\n";
          var body = data.team1+" "+score+" "+data.team2;
          var icon = "images/field.png";
          break;
      case 'Match Postponed':
          var title = "Jogo adiado!\n";
          var body = data.team1+" x "+data.team2;
          var icon = "images/time.png";
          break;
      case 'Match Finished':
          var title = "Fim de jogo!\n";
          var body = data.team1+" "+score+" "+data.team2;
          var icon = "images/time.png";
          break;
      default:
          var title = "Galo!";
          var body = "Galo!";
          var icon = "images/galo.png";
    }
  }

  var json = {
  "title": title,
  "body": body,
  "icon": icon
  }

  var data = JSON.stringify(json);

  return data;
}


