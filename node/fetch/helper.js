'use strict';

const soccerAdapter = require('./soccer-adapter.js');


async function getResults(sport, country, listOfAvailableTeams) {
  if (sport !== 'soccer') {
    console.log(`Sport: '${sport}' is incorrect or not implemented yet.`);
    return;
  }

  const listOfTeamsNames = getAdapterInputNames(listOfAvailableTeams);

  const liveMatches = await soccerAdapter.getLiveResults(country, listOfTeamsNames);
  
  const events = getEventsStandardTeamsNamesAndIds(liveMatches, listOfAvailableTeams)

  return events;
}

const getEventsStandardTeamsNamesAndIds = (liveMatches, availableTeams) => {
  const events = [];
  liveMatches.forEach(match => {
    let event = {};
    Object.assign(event, match);

    availableTeams.forEach(availableTeam => {
      if (match.team1 === availableTeam.adapterOutputName ) {
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
}

const getAdapterInputNames = availableTeams => availableTeams.map(team => team.adapterInputName);



module.exports = {
  getResults,
  getAdapterInputNames,
  getEventsStandardTeamsNamesAndIds
};
