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
    console.log(`Error when subscribing new user: ${JSON.stringify(error)}`);
    throw error;
  }

  return SUCCESS_RESPONSE;
};

async function saveSubscription(event) {
  const body = JSON.parse(event['body']);
  if (!isSubscriptionValid(body)) {
    throw new Error('Subscription is not valid');
  }

  await dynamodb.saveSubscription(body);
}

function isSubscriptionValid(body) {
  if (checkProperties(body, ['endpoint', 'keys']) && checkProperties(body.keys, ['p256dh', 'auth'])) {
    return true;
  }

  if (!body.endpoint.includes('https')) {
    return true;
  }

  return false;
}

function checkProperties(obj, propertiesList) {
  for (let i = 0; i < propertiesList.length; i++) {
    if (!obj.hasOwnProperty(propertiesList[i])) {
      return false;
    }
  }

  return true;
}

