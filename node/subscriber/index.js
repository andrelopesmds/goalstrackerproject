const logger = require('npmlog');
const helper = require('./helper');
const dynamodb = require('../lib/dynamodb');
const constants = require('../shared/contants');

module.exports.handler = async (event) => {
  try {
    await saveSubscription(event);
  } catch (error) {
    logger.info(`Error when subscribing new user! Event: ${JSON.stringify(event)}. Error:${JSON.stringify(error)}.`);
    throw error;
  }

  const body = JSON.stringify({
    message: 'User subscribed!',
  });

  return { ...constants.DEFAULT_SUCCESS_RESPONSE, body };
};

async function saveSubscription(event) {
  const subscription = helper.processSubscription(event);
  subscription.subscribeDate = new Date().toISOString();
  await dynamodb.saveSubscription(subscription);
}
