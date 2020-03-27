'use strict';

const sportsLive = require('sports-live');

const DESIRED_KEYS = ['currentStatus', 'score', 'team1', 'team2'];

async function getResults(sport) {
  const results = await runApi(sport);

  validateResults(results);

  return results;
}

function runApi(sport) {
  return new Promise((resolve) => {
    sportsLive.getAllMatches(sport, function(err, matches) {
      if (err) {
        throw err;
      } else {
        resolve(matches);
      }
    });
  });
}

function validateResults(results) {
  if (typeof(results) !== 'object') {
    throw new Error('Invalid results from API.');
  }

  results.forEach((result) => {
    for (const [key, value] of Object.entries(result)) {
      if (!DESIRED_KEYS.includes(key)) {
        throw new Error(`Result is missing a key. Results: ${results}`);
      } else if (!value) {
        throw new Error(`Result is missing value. Results: ${results}`);
      }
    }
  });
}

module.exports = {
  getResults,
};
