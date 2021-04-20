const helper = require('./helper');
const shared = require('../shared/shared');

module.exports.handler = async (event) => {
  try {
    await processNewSubscription(event);
  } catch (error) {
    console.log(`Error when processing a new subscription! Error: ${JSON.stringify(error)}. Event: ${JSON.stringify(event)}`);
    throw error;
  }

  console.log('Operation concluded!');
};

const processNewSubscription = async (event) => {
  if (event.Records[0].eventName !== 'INSERT') {
    console.log(`Event was ignored as it is not a new subscription in db. Event: ${JSON.stringify(event)}`);
    return;
  }

  const subscription = helper.createSubscriptionsObject(event);

  const obj = helper.createWelcomeMessageObject();

  await shared.callPushHandler(obj, subscription);
}
