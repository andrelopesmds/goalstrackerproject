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
  const [obj, idsList] = createEventObjectAndIdsList(event);
  console.log('idsList');
  console.log(idsList);
  console.log(`Event which will be sent: ${JSON.stringify(obj)}`);

  const subscriptions = await dynamodb.getSubscriptions();
  console.log(subscriptions);
  const filteredSubscriptions = filterSubscriptions(subscriptions, idsList);
  filteredSubscriptions.forEach((s) => {
    delete s.teamsIds;
  });

  const results = [];
  for (let i = 0; i < filteredSubscriptions.length; i++) {
    const result = await sendPush(obj, filteredSubscriptions[i]);
    results.push(result);
  }

  console.log(`Job done. Results: ${JSON.stringify(results)}`);
}

const filterSubscriptions = (subscriptions, idsList) => {
  const filteredSubscriptions = [];
  subscriptions.forEach((subscription) => {
    let containId = false;
    console.log(subscription);
    const subscriptionIdsList = getSubscriptionIdsList(subscription.teamsIds);

    subscriptionIdsList.forEach((subscriptionId) => {
      idsList.forEach((id) => {
        if (subscriptionId == id) {
          containId = true;
        }
      });
    });

    if (containId) {
      filteredSubscriptions.push(subscription);
    }
  });

  return filteredSubscriptions;
};

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

function createEventObjectAndIdsList(event) {
  try {
    const imageOfEvent = event.Records[0].dynamodb.NewImage;
    const eventObj = {
      team1: imageOfEvent.team1.S,
      team2: imageOfEvent.team2.S,
      score: imageOfEvent.score.S,
      currentStatus: imageOfEvent.currentStatus.S,
    };

    const idsList = [];
    console.log(imageOfEvent);
    if (imageOfEvent.team1Id) {
      idsList.push(imageOfEvent.team1Id.S);
    }
    if (imageOfEvent.team2Id) {
      idsList.push(imageOfEvent.team2Id.S);
    }

    return [
      eventObj,
      idsList,
    ];
  } catch (error) {
    throw new Error(`Error processing dynamodb event: ${JSON.stringify(error)}.`);
  }
}

function getSubscriptionIdsList(subscriptionIdsList) {
  let list = subscriptionIdsList.replace('[', '');
  list = list.replace(']', '');
  list = list.split(',');
  return list;
}
