'use strict';

const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const dynamodb = require('../lib/dynamodb');
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
  const obj = createEventObjectWithIds(event);
  console.log(`Event which will be sent: ${JSON.stringify(obj)}`);

  const subscriptions = await dynamodb.getSubscriptions();
  console.log(subscriptions);
  subscriptions.forEach((s) => {
    delete s.teamsIds;
  });

  const results = [];
  for (let i = 0; i < subscriptions.length; i++) {
    const result = await sendPush(obj, subscriptions[i]);
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

function createEventObjectWithIds(event) {
  // todo ids
  try {
    return {
      team1: event.Records[0].dynamodb.NewImage.team1.S,
      team2: event.Records[0].dynamodb.NewImage.team2.S,
      score: event.Records[0].dynamodb.NewImage.score.S,
      currentStatus: event.Records[0].dynamodb.NewImage.currentStatus.S,
    };
  } catch (error) {
    console.log(`Error processing dynamodb event: ${JSON.stringify(error)}`);
    throw error;
  }
}
