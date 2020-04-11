const assert = require('assert');
const helper = require('./../welcomer/helper');

const endpoint = 'https...';
const keys = {
  p256dh: 'lwvjrkwbvnrkeb',
  auth: 'wvkjkewjbvkw',
};
const subscription = {
  endpoint: endpoint,
  keys: keys,
};
const event = {
  Records: [
    {
      dynamodb: {
        NewImage: {
          endpoint: {
            S: subscription.endpoint,
          },
          keys: {
            M: {
              auth: {
                S: subscription.keys.auth,
              },
              p256dh: {
                S: subscription.keys.p256dh,
              },
            },
          },
        },
      },
    },
  ],
};

const welcomeMessageObject = {
  currentStatus: 'Welcome to Goalstracker!',
  score: 'following your',
  team1: 'You are now',
  team2: 'favorite team(s)!',
};

describe('Welcomer service', function() {
  it('should create subscriptions object from DynamoDB stream', function() {
    const result = helper.createSubscriptionsObject(event);
    assert.deepEqual(result, subscription);
  });

  it('should create the correct Welcome message', function() {
    const result = helper.createWelcomeMessageObject();
    assert.deepEqual(result, welcomeMessageObject);
  });
});
