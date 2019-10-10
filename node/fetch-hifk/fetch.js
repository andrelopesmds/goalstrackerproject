const AWS         = require('aws-sdk');
const cronJob     = require('cron').CronJob;
const sportsLive  = require('sports-live');
const stringScore = require('string-score');

const ENVIRONMENT = process.env.NODE_ENV;
const INTERVAL    = process.env.JOB_INTERVAL;
const LAMBDA_NAME = process.env.LAMBDA_NAME;

const TEAM     = 'HIFK Helsinki';
const TEAM2    = 'IFK Helsinki';
const SPORT    = 'hockey';
const DISTANCE = 0.5;

var buffer;
var score;


const job = new cronJob('0 */' + INTERVAL + ' * * * *', function() {
    fetchGoals();
});

if (ENVIRONMENT === 'production') {
    job.start();
}

async function fetchGoals() {
    let results = await runApi();
    let msg = checkGameStatus(results);

    if (msg) sendRequest(msg);
}

function checkGameStatus(matches) {
    for (i = 0; i < matches.length; i++) {
        if ((checkTeam(matches[i].team1) || checkTeam(matches[i].team2)) && (buffer != matches[i].currentStatus || score != matches[i].score)) {
             buffer = matches[i].currentStatus;
             score = matches[i].score;
             return configMessage(matches[i]);
        }
    }

    return null;
}

function sendRequest(msg) {
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
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        }); 
    });
}

function runApi() {
    return new Promise((resolve, reject) => {
        sportsLive.getAllMatches(SPORT, function(err, matches) {
            if (err) {
                reject(err);
            } else {
                resolve(matches);
            }
        });
    });
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
    let response = false;
    if ((typeof team == 'string') && (stringScore(TEAM, team, DISTANCE) > DISTANCE || stringScore(TEAM2, team, DISTANCE) > DISTANCE)) {
        response = true;
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
