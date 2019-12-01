'use strict';

const sportsLive  = require('sports-live');
const stringScore = require('string-score');
const dynamodb = require('../lib/dynamodb');
const underscore = require('underscore');

const TEAM     = 'HIFK Helsinki';
const TEAM2    = 'ESV Kaufbeuren';
const SPORT    = 'hockey';
const DISTANCE = 0.5;
const MINUTESTOTRACK = 60 * 24;


module.exports.handler = async () => {
    try {
        await fetchGoals();
    } catch (error) {
        console.log(`Error when fetching goals: ${JSON.stringify(error)}`);
        throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({message: `Operation concluded!`}),
    };
};


async function fetchGoals() {
    let results = await runApi();
    if (results) {
        console.log(results)
    } else {
        console.log('no results');
    }
    let result = filterResult(results);

    if (result) {
        let event = configMessage(result);
        // get events db
        const events = await dynamodb.getEvents(MINUTESTOTRACK);
        // check if exists
        const isNewEvent = checkEventIsNew(events, event);
        if (isNewEvent) {
            // update db
            await dynamodb.saveEvent(event);
        }
    }
}

function checkEventIsNew(events, event) {
    for(let i = 0; i < events.length; i++) {
        if (underscore.isEqual(events[i], event)) {
            console.log('return false');
            return false;
        }
    };

    console.log('return true');
    return true;
}

function filterResult(matches) {
    for (let i = 0; i < matches.length; i++) {
        if (checkTeam(matches[i].team1) || checkTeam(matches[i].team2)) {
            return matches[i];
        }
    }
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
    var icon = 'hifk';

    if (data.currentStatus.includes(data.team1)) {
        var title = data.team1 + 'scores a goal!';
        var body = data.team1 + " " + data.score + " " + data.team2;

    } else if (data.currentStatus.includes(data.team2)) {
        var title = message = data.team2 + 'scores a goal!';
        var body = data.team1 + " " + data.score + " " + data.team2;

    } else {
        switch (data.currentStatus) {
        case 'Kick Off':
            var title = "Game started!\n";
            var body = data.team1 + " x " + data.team2;
            break;
        case 'E/p1':
            var title = "End of first period!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            break;
        case 'E/p2':
            var title = "End of first period!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            break;
        case 'Match Postponed':
            var title = "Match Postponed!\n";
            var body = data.team1 + " x " + data.team2;
            break;
        case 'Match Finished':
            var title = "Match Finished!\n";
            var body = data.team1 + " " + data.score + " " + data.team2;
            break;
        default:
            var title = data.currentStatus;
            var body = data.team1 + " " + data.score + " " + data.team2;
        }
    }

    var json = {
        'title' : title,
        'body' : body,
        'icon' : icon
    }

    return data;
}

function checkTeam(team) {
    let response = false;
    if ((typeof team == 'string') && (stringScore(TEAM, team, DISTANCE) > DISTANCE || stringScore(TEAM2, team, DISTANCE) > DISTANCE)) {
        response = true;
    }

    return response;
}