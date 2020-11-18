const helper = require('./helper');
const dynamodb = require('../lib/dynamodb');

const SUCCESS_RESPONSE = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: 'User subscribed!',
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
  const subscription = helper.processSubscription(event);
  subscription.subscribeDate = new Date().toISOString();
  await dynamodb.saveSubscription(subscription);
}
