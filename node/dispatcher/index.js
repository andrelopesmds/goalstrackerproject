'use strict';

const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const dynamodb = require('../lib/dynamodb');
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
  const [obj, idsList] = helper.createEventObjectAndIdsList(event);
  console.log(`IdsList: ${JSON.stringify(idsList)}`);
  console.log(`Object which will be sent: ${JSON.stringify(obj)}`);

  const subscriptions = await dynamodb.getSubscriptions();

  const filteredSubscriptions = helper.filterAndCleanSubscriptions(subscriptions, idsList);

  const results = [];
  for (let i = 0; i < filteredSubscriptions.length; i++) {
    const result = await sendPush(obj, filteredSubscriptions[i]);
    results.push(result);
  }

  console.log(`Job done. Results: ${JSON.stringify(results)}`);
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
        console.log(`Error when sending push notification: ${JSON.stringify(err)}`);
        throw err;
      } else {
        resolve(true);
      }
    });
  });
}

