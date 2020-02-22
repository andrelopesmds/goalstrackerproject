const dispatcher = require('../dispatcher/index.js');
const assert    = require('assert');


describe('Dispatcher service', function() {
    it('should import module correctly', function() {
        assert.equal(typeof dispatcher, 'object');
    });
});