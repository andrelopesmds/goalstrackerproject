const logger = require('npmlog');
const soccerAdapter = require('./soccer-adapter.js');

async function getResults(sport, listOfAvailableTeams) {
  if (sport !== 'soccer') {
    logger.info(`Sport: '${sport}' is incorrect or not implemented yet.`);
    return [];
  }

  const liveMatches = await soccerAdapter.getLiveResults(listOfAvailableTeams);

  const events = getEventsStandardTeamsNamesAndIds(liveMatches, listOfAvailableTeams);

  return events;
}

const getEventsStandardTeamsNamesAndIds = (liveMatches, availableTeams) => {
  const events = [];
  liveMatches.forEach((match) => {
    const event = {};
    Object.assign(event, match);

    availableTeams.forEach((availableTeam) => {
      if (match.team1 === availableTeam.adapterOutputName) {
        event.team1 = availableTeam.name;
        event.team1Id = availableTeam.id;
      } else if (match.team2 === availableTeam.adapterOutputName) {
        event.team2 = availableTeam.name;
        event.team2Id = availableTeam.id;
      }
    });

    events.push(event);
  });

  return events;
};

module.exports = {
  getResults,
  getEventsStandardTeamsNamesAndIds,
};
