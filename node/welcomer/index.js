'use strict';

const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const helper = require('./helper');
const pushFunction = process.env.pushFunction;

module.exports.handler = async (event) => {
  try {
    await processEvent(event);
  } catch (error) {
    console.log(`Error when processing event: ${JSON.stringify(error)}. Event: ${JSON.stringify(event)}`);
    throw error;
  }

  console.log(`Operation concluded!`);
};

async function processEvent(event) {
  if (event.Records[0].eventName !== 'INSERT') {
    console.log(`Event was ignored as it is not an insert. Event: ${JSON.stringify(event)}`);
    return;
  }

  const subscription = helper.createSubscriptionsObject(event);

  const obj = helper.createWelcomeMessageObject();

  await sendPush(obj, subscription);
}

async function sendPush(obj, subscription) {
  return new Promise((resolve, reject) => {
    const params = {
      FunctionName: pushFunction,
      InvocationType: 'Event',
      Payload: JSON.stringify({obj: obj, subscription: subscription}),
    };

    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(`Error when sending push notification. Subscription: ${JSON.stringify(subscription)}`);
        throw err;

      } else {
        resolve(true);
      }
    });
  });
}

