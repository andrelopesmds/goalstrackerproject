'use strict';

const soccerParser = require('livesoccertv-parser');

const REQUIRED_KEYS = ['score', 'team1', 'team2'];


async function getLiveResults(country, listOfTeams) {
  const allMatches = await runApi(country, listOfTeams);

  const liveMatches = filterLiveMatches(allMatches);

  const results = buildResults(liveMatches);
  
  validateResults(results);

  return results;
}

async function runApi(country, listOfTeams) {
  const promises = [];
  listOfTeams.forEach(team => {
    promises.push(soccerParser(country, team));
  });

  const allMatches = [];
  const arrayOfArrayOfMatches = await Promise.all(promises);
  arrayOfArrayOfMatches.forEach(array => {
    array.forEach(match => {
      allMatches.push(match);
    });
  });

  const allMatchesNoDuplicates = [...new Set(allMatches)];

  return allMatchesNoDuplicates;
}

const filterLiveMatches = allMatches => allMatches.filter(match => match.live);

const buildResults = matches => matches.map(match => buildResult(match));

const buildResult = match => {
  const game = match.game;
  const hifenIndex = game.indexOf('-');
  const team1 = game.substring(0, hifenIndex - 3);
  const score = game.substring(hifenIndex - 2, hifenIndex + 3);
  const team2 = game.substring(hifenIndex + 4);

  return {
    team1: team1,
    team2: team2,
    score: score,
  };
}

const validateResults = results => {
  if (typeof(results) !== 'object') {
    throw new Error('Invalid results from API.');
  }

  results.forEach((result) => {
    REQUIRED_KEYS.forEach(requiredKey => {
      if (!result.hasOwnProperty(requiredKey)) {
        throw new Error(`Result is missing a key. Result: ${JSON.stringify(result)}`);
      }

      if (!result[requiredKey]) {
        throw new Error(`Result is missing a value. Result: ${JSON.stringify(result)}`);
      }
    });
  });
}

module.exports = {
  getLiveResults,
  filterLiveMatches,
  buildResults,
  validateResults
};
