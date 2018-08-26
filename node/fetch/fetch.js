var TimerJob = require('timer-jobs');
var jobTime = 120000; // set the time in ms
var sportsLive = require('sports-live');
const teamName = 'Atletico Mineiro';
const teamName2 = 'Atletico-MG';
var request = require('request');
var url = 'http://localhost:3000';
var score = require('string-score');

// global variables
var buffer;
var score;

var fetchGoals = new TimerJob({interval : jobTime}, function(done) {
    return runApi()
        .then(function(matches) { return checkGameStatus(matches); })
        .then(function(msg) {
            if (msg) {
                sendRequest(msg);
            }
        })
        .catch(function(err) { console.log("It failed: ", err); })
        .then(function() {
            console.log('...');
            done();
        })
});

fetchGoals.start();

function checkGameStatus(matches) {

    if (matches) {

        for (i = 0; i < matches.length; i++) {

            if (checkTeam(matches[i].team1) || checkTeam(matches[i].team2)) {

                if (buffer != matches[i].currentStatus ||
                    score != matches[i].score) {

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

function sendRequest(msg) {
    return new Promise(function(resolve, reject) {
        request.post(url, {form : {team : 'galo', message : msg}},
                     function(error, response, body) {
                         if (!error && response.statusCode == 200) {
                             resolve("'success':true");
                         } else {
                             reject("'success':false");
                         }
                     });
    })
}

function runApi() {
    return new Promise(function(resolve, reject) {
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

    var json = {"title" : title, "body" : body, "icon" : icon}

    var data = JSON.stringify(json);

    return data;
}

function checkTeam(team) {
    var response;
    if (typeof team == 'string') {
        if (score(teamName, team, 0.5) > 0.5 ||
            score(teamName2, team, 0.5) > 0.5) {
            response = true;
        } else {
            response = false;
        }
    } else {
        response = false;
    }
    return response;
}

var fetch = {};
fetch.configMessage = configMessage;
fetch.runApi = runApi;
fetch.checkGameStatus = checkGameStatus;
fetch.sendRequest = sendRequest;
fetch.checkTeam = checkTeam;
module.exports = fetch;
