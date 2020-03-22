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
    console.log(`Error when subscribing new user! Event: ${JSON.stringify(event)}. Error:${JSON.stringify(error)}.`);
    throw error;
  }

  return SUCCESS_RESPONSE;
};

async function saveSubscription(event) {
  const body = JSON.parse(event.body);
  const subscription = JSON.parse(body.subscription);
  const teamsIds = body.teamsIds;

  validateInput(subscription, teamsIds);

  subscription.teamsIds = teamsIds.toString();
  await dynamodb.saveSubscription(subscription);
}

const validateInput = (subscription, teamsIds) => {
  if (!isSubscriptionValid(subscription)) {
    throw new Error('Subscription is not valid');
  }

  if (!teamsIds || !(teamsIds.length > 0)) {
    throw new Error('TeamsIds is not valid');
  }
};

const isSubscriptionValid = (subscription) => {
  if (!hasProperties(subscription, ['endpoint', 'keys']) || !hasProperties(subscription.keys, ['p256dh', 'auth'])) {
    return false;
  }

  if (!subscription.endpoint.includes('https')) {
    return false;
  }

  return true;
};

const hasProperties = (obj, propertiesList) => {
  return propertiesList.every((property) => obj.hasOwnProperty(property));
};
