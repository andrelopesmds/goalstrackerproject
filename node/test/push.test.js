const helper = require('../push/helper');
const assert = require('assert');

const event = {
  obj: {
    currentStatus: 'half time',
    team1: 'HIFK',
    score: '3x0',
    team2: 'other team',
  },
};

const expected = JSON.stringify({
  title: event.obj.currentStatus,
  body: `${event.obj.team1} ${event.obj.score} ${event.obj.team2}`,
});

describe('Push service', function() {
  it('should create the payload based on event', function() {
    const result = helper.createPayload(event);

    assert.equal(result, expected);
  });
});
