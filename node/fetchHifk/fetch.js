var argv = require('yargs').argv;

var TimerJob = require('timer-jobs');
var jobTime = 1000;
var sportsLive = require('sports-live');
const teamName = 'IFK Helsinki';
const teamName2 = 'HIFK Helsinki';
var request = require('request');
var url = 'http://localhost:' + argv.pushPort;
var stringScore = require('string-score');

var buffer;
var score;

var fetchGoals = new TimerJob({interval : jobTime}, function(done) {
    return runApi()
        .then(function(matches) {
            return checkGameStatus(matches);
        })
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
        request.post(url, {
            form : {
                message : msg
            }

        }, function(error, response, body) {
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
        sportsLive.getAllMatches("hockey", function(err, matches) {
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
        var title = data.team1 + 'scores a goal!';
        var body = data.team1 + " " + data.score + " " + data.team2;
        var icon = "images/hifk.png";

    } else if (data.currentStatus.includes(data.team2)) {
        var title = message = data.team2 + 'scores a goal!';
        var body = data.team1 + " " + data.score + " " + data.team2;
        var icon = "images/hifk.png";

    } else {
        switch (data.currentStatus) {
        case 'Kick Off':
            var title = "Game started!\n";
            var body = data.team1 + " x " + data.team2;
            var icon = "images/hifk.png";
            break;
        case 'E/p1':
            var title = "End of first period!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            var icon = "images/hifk.png";
            break;
        case 'E/p2':
            var title = "End of first period!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            var icon = "images/hifk.png";
            break;
        case 'Match Postponed':
            var title = "Match Postponed!\n";
            var body = data.team1 + " x " + data.team2;
            var icon = "images/hifk.png";
            break;
        case 'Match Finished':
            var title = "Match Finished!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            var icon = "images/hifk.png";
            break;
        default:
            var title = data.currentStatus;
            var body = data.team1 + " " + data.score + " " + data.team2;
            var icon = "images/hifk.png";
        }
    }

    var json = {
        'title' : title,
        'body' : body,
        'icon' : icon
    }

    var data = JSON.stringify(json);
    return data;
}

function checkTeam(team) {
    var response;
    if (typeof team == 'string') {
        if (stringScore(teamName, team, 0.5) > 0.5 ||
            stringScore(teamName2, team, 0.5) > 0.5) {
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
