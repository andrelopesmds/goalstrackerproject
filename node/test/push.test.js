const assert = require('assert');
const helper = require('../push/helper');

const object = {
  title: 'half time',
  body: 'HIFK 3x0 other team',
};

const expected = JSON.stringify(object);

describe('Push service', () => {
  it('should create the payload based on event', () => {
    const result = helper.createPayload(object);

    assert.equal(result, expected);
  });
});
