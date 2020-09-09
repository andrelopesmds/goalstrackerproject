'use strict';

const assert = require('assert');

const helper = require('./../../fetch/helper.js');
const constants = require('./constants.js');

describe('Fetch - Helper test', function() {
  it('getAdapterInputNames should return a list of available teams', function() {
    const result = helper.getAdapterInputNames(constants.AVAILABLE_TEAMS);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIST_OF_TEAMS_NAMES_FOR_INPUT));
  });


  it('getEventsStandardTeamsNamesAndIds should return a list of events ready to be saved into the database', function() {
    const result = helper.getEventsStandardTeamsNamesAndIds(constants.LIVE_RESULTS, constants.AVAILABLE_TEAMS);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_RESULTS_EVENT_FORMAT));
  });
});
