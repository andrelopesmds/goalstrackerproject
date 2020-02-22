const fetch = require('../fetch/index.js');
const assert = require('assert');


describe('Fetch service', function() {
  it('should import module correctly', function() {
    assert.equal(typeof fetch, 'object');
  });
});
