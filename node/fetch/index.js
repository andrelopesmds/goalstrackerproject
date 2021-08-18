const logger = require('npmlog');
const dynamodb = require('../lib/dynamodb');
const helper = require('./helper');

const MINUTESTOTRACK = 60 * 24;

async function handler(event) {
  try {
    const { sport } = event;
    await fetchGoals(sport);
  } catch (error) {
    logger.info(`Error when fetching goals: ${JSON.stringify(error)}`);
    throw error;
  }

  logger.info('Operation concluded!');
}

async function fetchGoals(sport) {
  const availableTeams = await dynamodb.getTeams();

  const fetchedEvents = await helper.getResults(sport, availableTeams);

  if (fetchedEvents && fetchedEvents.length > 0) {
    const recentlySavedEvents = await dynamodb.getEvents(MINUTESTOTRACK);

    let notSavedEvents = filterNotSavedEvents(fetchedEvents, recentlySavedEvents);

    if (notSavedEvents && notSavedEvents.length > 0) {
      notSavedEvents = notSavedEvents.map((event) => ({
        ...event,
        timestamp: new Date().toISOString(),
      }));
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

// eslint-disable-next-line max-len
const isEqual = (event1, event2) => event1.score === event2.score && event1.team1 === event2.team1 && event1.team2 === event2.team2;

module.exports = {
  handler,
};
