const assert = require('assert');
const chai = require('chai');

const { expect } = chai;

const soccerAdapter = require('../../fetch/soccer-adapter.js');
const constants = require('./constants.js');

describe('Fetch - Soccer adapter test', () => {
  it('filterLiveMatches should return an empty array when there is no matches', () => {
    const result = soccerAdapter.filterLiveMatchesAndRemoveDuplicates([]);
    const expected = [];

    assert.equal(JSON.stringify(result), JSON.stringify(expected));
  });

  it('filterLiveMatches should return an array of live matches when there is at least one live match', () => {
    const result = soccerAdapter.filterLiveMatchesAndRemoveDuplicates([constants.ALL_GAMES]);
    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_MATCHES));
  });

  it('buildResults should return an empty array when there is no live matches', () => {
    const result = soccerAdapter.buildResults([]);
    const expected = [];

    assert.equal(JSON.stringify(result), JSON.stringify(expected));
  });

  it('buildResults should return an array of live results (db format) when there is at least a live match', () => {
    const result = soccerAdapter.buildResults(constants.LIVE_MATCHES);

    assert.equal(JSON.stringify(result), JSON.stringify(constants.LIVE_RESULTS));
  });

  it('validateResults should execute without error when live results are correct or empty', () => {
    soccerAdapter.validateResults([]);
    soccerAdapter.validateResults(constants.LIVE_RESULTS);
  });

  it('validateResults should throw an error live results are not an array', () => {
    expect(() => { soccerAdapter.validateResults(null); }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults(''); }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults(); }).to.throw(Error);
    expect(() => { soccerAdapter.validateResults([constants.INVALID_LIVE_RESULT]); }).to.throw(Error);
  });

  it('isDuplicated should find duplicates correctly', () => {
    const array = [
      {
        live: true,
        game: 'XXXXX',
      },
      {
        live: false,
        game: 'YYYYY',
      },
    ];

    const result1 = soccerAdapter.isDuplicated([], {});
    assert.equal(result1, false);

    const result2 = soccerAdapter.isDuplicated([], { live: false, game: 'XXXX' });
    assert.equal(result2, false);

    const result3 = soccerAdapter.isDuplicated(array, { game: 'YYYYY', live: false });
    assert.equal(result3, true);

    const result4 = soccerAdapter.isDuplicated(array, { game: 'XXXXX', live: true });
    assert.equal(result4, true);

    const result5 = soccerAdapter.isDuplicated(array, { game: 'XXXXX', live: false });
    assert.equal(result5, false);
  });
});
