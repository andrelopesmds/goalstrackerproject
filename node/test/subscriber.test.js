const assert = require('assert');
const helper = require('../subscriber/helper');

const endpoint = 'https...';
const keys = {
  p256dh: 'lwvjrkwbvnrkeb',
  auth: 'wvkjkewjbvkw',
};
const teamsIds = [1, 13];
const subscription = {
  endpoint,
  keys,
};
const body = JSON.stringify({
  subscription: JSON.stringify(subscription),
  teamsIds,
});
const event = {
  body,
};

const expectedResult = subscription;
expectedResult.teamsIds = teamsIds.toString();

describe('Subscription service', () => {
  it('should process user\'s subscription from event input', () => {
    const result = helper.processSubscription(event);

    assert.deepEqual(result, expectedResult);
  });
});
