const soccerParser = require('livesoccertv-parser');

const REQUIRED_KEYS = ['score', 'team1', 'team2'];

async function getLiveResults(listOfTeams) {
  const allMatches = await runApi(listOfTeams);

  const liveMatches = filterLiveMatchesAndRemoveDuplicates(allMatches);

  const results = buildResults(liveMatches);

  validateResults(results);

  return results;
}

async function runApi(listOfTeams) {
  const promises = [];
  listOfTeams.forEach((team) => {
    promises.push(soccerParser(team.country, team.adapterInputName));
  });

  const allMatches = await Promise.all(promises);
  console.log(JSON.stringify(allMatches));

  return allMatches;
}

const filterLiveMatchesAndRemoveDuplicates = (allMatches) => {
  const liveMatches = [];
  allMatches.forEach((array) => {
    array.forEach((match) => {
      if (match.live && !isDuplicated(liveMatches, match)) {
        liveMatches.push(match);
      }
    });
  });

  return liveMatches;
};

const isDuplicated = (array, match) => array.some((a) => a.game === match.game && a.live === match.live);

const buildResults = (matches) => matches.map((match) => buildResult(match));

const buildResult = (match) => {
  const { game } = match;
  const hifenIndex = game.indexOf('-');
  const team1 = game.substring(0, hifenIndex - 3);
  const score = game.substring(hifenIndex - 2, hifenIndex + 3);
  const team2 = game.substring(hifenIndex + 4);

  return {
    team1,
    team2,
    score,
  };
};

const validateResults = (results) => {
  if (typeof (results) !== 'object') {
    throw new Error('Invalid results from API.');
  }

  results.forEach((result) => {
    validateResult(result);
  });
};

const validateResult = (result) => {
  REQUIRED_KEYS.forEach((requiredKey) => {
    if (!Object.prototype.hasOwnProperty.call(result, requiredKey)) {
      throw new Error(`Result is missing a key. Result: ${JSON.stringify(result)}`);
    }

    if (!result[requiredKey]) {
      throw new Error(`Result is missing a value. Result: ${JSON.stringify(result)}`);
    }
  });
};

module.exports = {
  getLiveResults,
  filterLiveMatchesAndRemoveDuplicates,
  buildResults,
  validateResults,
  isDuplicated,
};
