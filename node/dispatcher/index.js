const logger = require('npmlog');
const dynamodb = require('../lib/dynamodb');
const helper = require('./helper');
const shared = require('../shared/shared');

module.exports.handler = async (event) => {
  try {
    await processNewGameEvent(event);
  } catch (error) {
    logger.info('Error when processing a new game event!'
    + `Error: ${JSON.stringify(error)}. Event: ${JSON.stringify(event)}`);
    throw error;
  }

  logger.info('Operation concluded!');
};

const processNewGameEvent = async (event) => {
  if (event.Records[0].eventName !== 'INSERT') {
    logger.info(`Event was ignored as it is not a new game event in db. Event: ${JSON.stringify(event)}`);
    return;
  }

  const imageOfEvent = event.Records[0].dynamodb.NewImage;
  logger.info(`Image that will be processed: ${JSON.stringify(imageOfEvent)}`);

  const obj = helper.createEventObject(imageOfEvent);
  const idsList = helper.createIdsList(imageOfEvent);

  logger.info(`IdsList: ${JSON.stringify(idsList)}`);
  logger.info(`Object which will be sent: ${JSON.stringify(obj)}`);

  const subscriptions = await dynamodb.getSubscriptions();

  const filteredSubscriptions = helper.filterAndCleanSubscriptions(subscriptions, idsList);

  const results = await sendMessages(obj, filteredSubscriptions);

  logger.info(`Job done. Results: ${JSON.stringify(results)}`);
};

const sendMessages = async (obj, filteredSubscriptions) => {
  const promises = [];
  filteredSubscriptions.forEach((subscription) => {
    promises.push(shared.callPushHandler(obj, subscription));
  });

  const allMessages = await Promise.all(promises);
  return allMessages;
};
