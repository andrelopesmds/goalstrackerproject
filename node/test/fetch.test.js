const fetch = require('../fetch/index.js');
const assert = require('chai').assert;


describe('Fetch service', function() {
  it('should import module correctly', function() {
    assert.equal(typeof fetch, 'object');
  });

  it('should fetch result', async function() {
    const result = await fetch.handler();
    assert.equal(result.statusCode, 200);
  });

  it('should test third part API', async function() {
    const results = await fetch.runApi();
    assert.equal(typeof results, 'object');
    assert.isAtLeast(results.length, 1, 'There is at least one item on the list');
    results.forEach((result) => {
      assert.property(result, 'team1');
      assert.property(result, 'team2');
      assert.property(result, 'score');
      assert.property(result, 'currentStatus');
    });
  });
});
