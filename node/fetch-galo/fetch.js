const matches = require('livesoccertv-parser')
const request = require('request')
const TimerJob = require('timer-jobs')

const URL = process.env.PUSH_URL;
const INTERVAL = process.env.JOB_INTERVAL;
const ENVIRONMENT = process.env.NODE_ENV;

const jobConfig = {
    interval: INTERVAL
};

const countryName = 'brazil';
const teamName = 'atletico-mineiro';

var lastLiveStatus = false;
var lastScoreStatus;

var fetchGoals = new TimerJob(jobConfig, function(done) {
    return matches(countryName, teamName)
        .then(function(matches) {
            return checkGameStatus(matches);
        })
        .then(function(msg) {
            if (msg) {
                sendRequest(msg);
                console.log(msg);
            }
        })
        .catch(function(err) {
            console.log("It failed: ", err);
        })
        .then(function() {
            console.log('...');
            done();
        })
});

if (ENVIRONMENT === 'production') {
    fetchGoals.start();
}

function checkGameStatus(matches) {
    let response = null;

    if (matches && matches.length > 0) {
        let liveMatch = matches.find(function(match) {
            return match.live;
        });

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
        let obj = {
            form: {
                team: 'galo',
                message: msg
            }
        };
        
        request.post(URL, obj, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve("'success':true");
            } else {
                reject("'success':false");
            }
        });
    });
}

function configMessage(body, msgType) {
    let json = {
        'body': body
    };

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
