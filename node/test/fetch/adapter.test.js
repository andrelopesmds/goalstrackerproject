const assert = require('chai').assert;
const expect = require('chai').expect;
const adapter = require('./../../fetch/adapter');

const SPORT = 'hockey';
const DESIRED_KEYS = ['currentStatus', 'score', 'team1', 'team2'];

describe('Adapter for third-party API', function() {
  it('should import module correctly', function() {
    assert.equal(typeof adapter, 'object');
    assert.equal(typeof adapter.getResults, 'function');
  });

  it('should get sports result in the desired format', async function() {
    const results = await adapter.getResults(SPORT);
    assert.equal(typeof results, 'object');
    assert.equal(typeof results, 'object');
    expect(results).to.be.an('array');
    results.forEach((item) => {
      assert.containsAllKeys(item, DESIRED_KEYS);
      DESIRED_KEYS.forEach((key) => {
        assert.exists(item[key]);
      });
    });
  });
});
