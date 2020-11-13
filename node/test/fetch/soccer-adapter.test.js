'use strict';

const assert = require('assert');
const chai = require('chai'); 
const expect = chai.expect;

const soccerAdapter = require('./../../fetch/soccer-adapter.js');
const constants = require('./constants.js');


describe('Fetch - Soccer adapter test', function() {
  it('filterLiveMatches should return an empty array when there is no matches', function() {
    const result = soccerAdapter.filterLiveMatches([]);
    const expected = [];

    assert.equal(JSON.stringify(result), JSON.stringify(expected));
  });

  it('filterLiveMatches should return an array of live matches when there is at least one live match', function() {
    const result = soccerAdapter.filterLiveMatches(constants.ALL_GAMES);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_MATCHES));
  });

  it('buildResults should return an empty array when there is no live matches', function() {
    const result = soccerAdapter.buildResults([]);
    const expected = []

    assert.equal(JSON.stringify(result), JSON.stringify(expected));
  });


  it('buildResults should return an array of live results (db format) when there is at least a live match', function() {
    const result = soccerAdapter.buildResults(constants.LIVE_MATCHES);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_RESULTS));
  });

  it('validateResults should execute without error when live results are correct or empty', function() {
    soccerAdapter.validateResults([]);
    soccerAdapter.validateResults(constants.LIVE_RESULTS);
  });

  it('validateResults should throw an error live results are not an array', function() {
    expect(() => { soccerAdapter.validateResults(null) }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults("") }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults() }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults([constants.INVALID_LIVE_RESULT]) }).to.throw(Error);
  });
});
