const assert = require('assert');

const helper = require('../../fetch/helper.js');
const constants = require('./constants.js');

describe('Fetch - Helper test', () => {
  it('getAdapterInputNames should return a list of available teams', () => {
    const result = helper.getAdapterInputNames(constants.AVAILABLE_TEAMS);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIST_OF_TEAMS_NAMES_FOR_INPUT));
  });

  it('getEventsStandardTeamsNamesAndIds should return a list of events ready to be saved into the database', () => {
    const result = helper.getEventsStandardTeamsNamesAndIds(constants.LIVE_RESULTS, constants.AVAILABLE_TEAMS);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_RESULTS_EVENT_FORMAT));
  });

  it('getEventsStandardTeamsNamesAndIds returns only one event when teams play agaisnt each other', () => {
    const LIVE_RESULTS = [
      {
        team1: 'Atlético Mineiro',
        team2: 'Santos',
        score: '2 - 1',
      },
    ];
    const AVAILABLE_TEAMS = [
      {
        adapterOutputName: 'Santos',
        id: '99',
        adapterInputName: 'Santos',
        name: 'Santos',
        country: 'brazil',
        sport: 'football',
      },
      {
        adapterOutputName: 'Atlético Mineiro',
        id: '13',
        adapterInputName: 'Atletico-Mineiro',
        name: 'Atlético MG',
        country: 'brazil',
        sport: 'football',
      },
    ];
    const expected = [
      {
        team1: 'Atlético MG',
        team2: 'Santos',
        score: '2 - 1',
        team2Id: '99',
        team1Id: '13',
      },
    ];

    const result = helper.getEventsStandardTeamsNamesAndIds(LIVE_RESULTS, AVAILABLE_TEAMS);
    assert.equal(1, result.length);
    assert.equal(expected[0].team1, result[0].team1);
    assert.equal(expected[0].team1Id, result[0].team1Id);
    assert.equal(expected[0].team2, result[0].team2);
    assert.equal(expected[0].team2Id, result[0].team2Id);
  });
});
