const assert = require('chai').assert;
const expect = require('chai').expect;
const adapter = require('./../../fetch/adapter');

const SPORT = 'hockey';
const DESIRED_KEYS = ['currentStatus', 'score', 'team1', 'team2'];

describe('Adapter for third-party API', function() {
  let results;
  before(async function() {
    results = await adapter.getResults(SPORT);
  });

  it('should get an array', function() {
    expect(results).to.be.an('array');
  });

  it('each item should be an object', function() {
    results.forEach((item) => {
      assert.equal(typeof(item), 'object');
    });
  });

  it('each object should contain the desired keys and values', function() {
    results.forEach((item) => {
      assert.containsAllKeys(item, DESIRED_KEYS);
      DESIRED_KEYS.forEach((key) => {
        assert.exists(item[key]);
      });
    });
  });
});
