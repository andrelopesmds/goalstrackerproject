var TimerJob = require('timer-jobs');
var jobTime = 120000; // set the time in ms
var sportsLive = require('sports-live');
var team = 'Atletico Mineiro';
var request = require('request');
var url = 'http://localhost:3000';

// global variables
var buffer;  
var score;

var fetchGoals = new TimerJob({ interval: jobTime}, function(done) {

    return runApi()
    .then(function (matches) {
        return checkGameStatus(matches);
    })
    .then(function (msg) {
        if(msg) {
            sendRequest(msg);
        }
    })
    .catch(function (err) {
        console.log("It failed: ", err);
    })
    .then(function () {
        console.log('...');
        done();
    })
});


fetchGoals.start();

function checkGameStatus(matches) {

    if(matches) {

        for (i = 0; i < matches.length; i++) {
 
            if (matches[i].team1 == team || matches[i].team2 == team) {

                if (buffer != matches[i].currentStatus || score != matches[i].score) {
                       
                    buffer = matches[i].currentStatus;
                    score = matches[i].score;
                    var msg = configMessage(matches[i]);
                    console.log('new status in this game!');
                    console.log(matches[i].currentStatus);
                    return msg;
                }

            }

        }

    }

    return null;

}


function sendRequest(msg){
                      
    request.post(url, {
        form: {
            team: 'galo',
            message: msg
        }
    }, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
    });
            
}


function runApi(){
    return new Promise(function (resolve, reject) {
        sportsLive.getAllMatches("soccer", function(err, matches) {
            if (err) { 
                console.log(err.message);
                reject(err);
            } else {
                resolve(matches);
            }
        });
    })
}

function configMessage(data) {

    if (data.currentStatus.includes(data.team1)) {

        var title = "Gol do " + data.team1 + "!";
        var body = data.team1 + " " + data.score + " " + data.team2;
        var icon = "images/ball.png";

    } else if (data.currentStatus.includes(data.team2)) {

        var title = message = "Gol do " + data.team2 + "!";
        var body = data.team1 + " " + data.score + " " + data.team2;
        var icon = "images/ball.png";

    } else {

        switch (data.currentStatus) {
            case 'Kick Off':
                var title = "Começa o jogo!\n";
                var body = data.team1 + " x " + data.team2;
                var icon = "images/galo.png";
                break;
            case 'Halftime':
                var title = "Fim do primeiro tempo!\n";
                var body = data.team1 + " " + data.score + " " + data.team2;
                var icon = "images/time.png";
                break;
            case '2nd Half Started':
                var title = "Começa o segundo tempo!\n";
                var body = data.team1 + " " + data.score + " " + data.team2;
                var icon = "images/time.png";
                break;
            case 'Match Postponed':
                var title = "Jogo adiado!\n";
                var body = data.team1 + " x " + data.team2;
                var icon = "images/time.png";
                break;
            case 'Match Finished':
                var title = "Fim de jogo!\n";
                var body = data.team1 + " " + data.score + " " + data.team2;
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

var fetch = {};
fetch.configMessage = configMessage;
fetch.runApi = runApi;
fetch.checkGameStatus = checkGameStatus;
fetch.sendRequest = sendRequest;
module.exports = fetch;
