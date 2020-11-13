'use strict';

const helper = require('../push/helper');
const assert = require('assert');

const object = {
  title: 'half time',
  body: 'HIFK 3x0 other team',
};

const expected = JSON.stringify(object);

describe('Push service', function() {
  it('should create the payload based on event', function() {
    const result = helper.createPayload(object);

    assert.equal(result, expected);
  });
});
