const cronJob = require('cron').CronJob;
const matches = require('livesoccertv-parser')

const AWS = require("aws-sdk");

const COUNTRY = process.env.COUNTRY;
const TEAM = process.env.TEAM;
const INTERVAL = process.env.JOB_INTERVAL;
const ENVIRONMENT = process.env.NODE_ENV;
const LAMBDA_NAME = process.env.LAMBDA_NAME;

var lastLiveStatus = false;
var lastScoreStatus;


const job = new cronJob('0 */' + INTERVAL + ' * * * *', function() {
	fetchGoals();
});

if (ENVIRONMENT === 'production') {
    job.start();
}

async function fetchGoals() {
    let results = await matches(COUNTRY, TEAM);

    let msg = checkGameStatus(results);

    if (msg) send(msg);
}

async function send(msg) {
    return new Promise((resolve, reject) => {
        const lambda = new AWS.Lambda({
            region: 'us-east-1'
        });

        let params = {
            FunctionName: LAMBDA_NAME,
            InvocationType: 'RequestResponse',
            Payload: msg
        };

        lambda.invoke(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });
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
fetch.send = send;
module.exports = fetch;
