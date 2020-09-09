'use strict';

const assert = require('assert');
const helper = require('./../subscriber/helper');

const endpoint = 'https...';
const keys = {
  p256dh: 'lwvjrkwbvnrkeb',
  auth: 'wvkjkewjbvkw',
};
const teamsIds = [1, 13];
const subscription = {
  endpoint: endpoint,
  keys: keys,
};
const body = JSON.stringify({
  subscription: JSON.stringify(subscription),
  teamsIds: teamsIds,
});
const event = {
  body: body,
};

const expectedResult = subscription;
expectedResult.teamsIds = teamsIds.toString();


describe('Subscription service', function() {
  it('should process user\'s subscription from event input', function() {
    const result = helper.processSubscription(event);

    assert.deepEqual(result, expectedResult);
  });
});
