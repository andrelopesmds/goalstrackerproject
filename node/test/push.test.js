const push = require('../push/index.js');
const assert    = require('assert');


describe('Push service', function() {
    it('should import module correctly', function() {
        assert.equal(typeof push, 'object');
    });
});