'use strict';

const dynamodb = require('../lib/dynamodb');

const SUCCESS_RESPONSE = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: `User subscribed!`,
  }),
};

module.exports.handler = async (event) => {
  try {
    await saveSubscription(event);
  } catch (error) {
    console.log(`Error when subscribing new user! Event: ${JSON.stringify(event)}`);
    throw error;
  }

  return SUCCESS_RESPONSE;
};

async function saveSubscription(event) {
  const body = JSON.parse(event.body);
  const subscription = JSON.parse(body.subscription);
  // TODO
  // const teamsIds = body.teamsIds;

  if (!isSubscriptionValid(subscription)) {
    throw new Error('Subscription is not valid');
  }

  await dynamodb.saveSubscription(subscription);
}

function isSubscriptionValid(subscription) {
  if (!hasProperties(subscription, ['endpoint', 'keys']) || !hasProperties(subscription.keys, ['p256dh', 'auth'])) {
    return false;
  }

  if (!subscription.endpoint.includes('https')) {
    return false;
  }

  return true;
}

function hasProperties(obj, propertiesList) {
  return propertiesList.every((property) => obj.hasOwnProperty(property));
}
