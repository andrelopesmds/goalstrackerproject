const subscriber = require('../subscriber/index.js');
const assert = require('assert');


describe('Subscriber service', function() {
  it('should import module correctly', function() {
    assert.equal(typeof subscriber, 'object');
  });
});
