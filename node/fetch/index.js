'use strict';

const dynamodb = require('../lib/dynamodb');
const helper = require('./helper');


const MINUTESTOTRACK = 60 * 24;


async function handler(event) {
  try {
    await fetchGoals(event.sport);
  } catch (error) {
    console.log(`Error when fetching goals: ${JSON.stringify(error)}`);
    throw error;
  }

  console.log(`Operation concluded!`);
};


async function fetchGoals(sport) {
  const availableTeams = await dynamodb.getTeams();

  const fetchedEvents = await helper.getResults(sport, 'brazil', availableTeams);

  if (fetchedEvents && fetchedEvents.length > 0) {
    const recentlySavedEvents = await dynamodb.getEvents(MINUTESTOTRACK);
    
    const notSavedEvents = filterNotSavedEvents(fetchedEvents, recentlySavedEvents);

    if (notSavedEvents && notSavedEvents.length > 0) {
      await dynamodb.saveEventList(notSavedEvents);
    }
  }
}

const filterNotSavedEvents = (fetchedEvents, recentlySavedEvents) => {
  const notSavedEvents = [];
  fetchedEvents.forEach((fetchedEvent) => {
    let isNew = true;

    recentlySavedEvents.forEach((recentlySavedEvent) => {
      if (isEqual(fetchedEvent, recentlySavedEvent)) {
        isNew = false;
      }
    });


    if (isNew) {
      notSavedEvents.push(fetchedEvent);
    }
  });

  return notSavedEvents;
};

const isEqual = (event1, event2) => {
  if (event1['score'] === event2['score'] && event1['team1'] === event2['team1'] && event1['team2'] === event2['team2']) {
    return true;
  }

  return false;
}


module.exports = {
  handler,
};
