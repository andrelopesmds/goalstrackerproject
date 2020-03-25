'use strict';

const dynamodb = require('../lib/dynamodb');
const adapter = require('./adapter');

const SPORT = 'hockey';
const MINUTESTOTRACK = 60 * 24;


async function handler() {
  try {
    await fetchGoals();
  } catch (error) {
    console.log(`Error when fetching goals: ${JSON.stringify(error)}`);
    throw error;
  }

  console.log(`Operation concluded!`);
};


async function fetchGoals() {
  const availableTeams = await dynamodb.getTeams();

  const results = await adapter.getResults(SPORT);

  const filteredResults = filterResultsAndIncludeIds(results, availableTeams);

  if (filteredResults && filteredResults.length > 0) {
    const recentlySavedEvents = await dynamodb.getEvents(MINUTESTOTRACK);

    const notSavedEvents = filterNotSavedEvents(filteredResults, recentlySavedEvents);

    if (notSavedEvents && notSavedEvents.length > 0) {
      await dynamodb.saveEventList(notSavedEvents);
    }
  }
}

const filterNotSavedEvents = (filteredResults, recentlySavedEvents) => {
  const notSavedEvents = [];
  filteredResults.forEach((result) => {
    let isNew = true;

    recentlySavedEvents.forEach((event) => {
      if (isSameEvent(result, event)) {
        isNew = false;
      }
    });

    if (isNew) {
      notSavedEvents.push(result);
    }
  });

  return notSavedEvents;
};

const isSameEvent = (resultWithIds, savedEvent) => {
  const evaluatedKeys = ['team1', 'team2', 'currentStatus', 'score'];

  let isSameEvent = true;
  evaluatedKeys.forEach((key) => {
    if (resultWithIds[key] !== savedEvent[key]) {
      isSameEvent = false;
    }
  });

  return isSameEvent;
};

const filterResultsAndIncludeIds = (results, availableTeams) => {
  const filteredResults = [];
  results.forEach((result) => {
    availableTeams.forEach((team) => {
      if ((team.name === result.team1) || (team.name === result.team2)) {
        const newItem = result;
        if (team.name === result.team1) {
          newItem.team1Id = team.id;
        } else {
          newItem.team2Id = team.id;
        }
        filteredResults.push(newItem);
      }
    });
  });
  return filteredResults;
};

module.exports = {
  handler,
};
