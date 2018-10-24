var matches = require('livesoccertv-parser')
var request = require('request')
var TimerJob = require('timer-jobs')

const url = 'http://localhost:3000';
const jobTime = 120000;
const countryName = 'brazil';
const teamName = 'gremio';

var lastLiveStatus = false;
var lastScoreStatus;

var fetchGoals = new TimerJob({interval : jobTime}, function(done) {
    return matches(countryName, teamName)
        .then(function(matches) { return checkGameStatus(matches); })
        .then(function(msg) {
            if (msg) {
                sendRequest(msg);
                console.log(msg);
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
    var response = null;

    if (matches && matches.length > 0) {
        var liveMatch = matches.find(function(match) { return match.live; });

        if (!lastLiveStatus && liveMatch && !liveMatch.played) {
            response = configMessage(liveMatch.game, 0);

            lastLiveStatus = true;
            lastScoreStatus = liveMatch.game;
        } else if (lastLiveStatus && liveMatch &&
                   lastScoreStatus != liveMatch.game) {
            response = configMessage(liveMatch.game, 1);

            lastScoreStatus = liveMatch.game;
        } else if (lastLiveStatus && (!liveMatch || liveMatch.played)) {
            response = configMessage(lastScoreStatus, 2);

            lastLiveStatus = false;
        }
    }
    return response;
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

function configMessage(body, msgType) {
    var json = {'body' : body};

    switch (msgType) {
    case 0:
        json.title = 'Começa o jogo!';
        json.icon = 'images/time.png';
        break;
    case 1:
        json.title = 'Gooool!';
        json.icon = 'images/ball.png';
        break;
    case 2:
        json.title = 'Fim de jogo!';
        json.icon = 'images/time.png';
        break;
    }

    return JSON.stringify(json);
}

var fetch = {};
fetch.matches = matches;
fetch.configMessage = configMessage;
fetch.checkGameStatus = checkGameStatus;
fetch.sendRequest = sendRequest;
module.exports = fetch;
