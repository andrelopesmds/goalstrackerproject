const helper = require('./helper');
const shared = require('../shared/shared');

module.exports.handler = async (event) => {
  try {
    await processEvent(event);
  } catch (error) {
    console.log(`Error when processing event: ${JSON.stringify(error)}. Event: ${JSON.stringify(event)}`);
    throw error;
  }

  console.log('Operation concluded!');
};

async function processEvent(event) {
  if (event.Records[0].eventName !== 'INSERT') {
    console.log(`Event was ignored as it is not an insert. Event: ${JSON.stringify(event)}`);
    return;
  }

  const subscription = helper.createSubscriptionsObject(event);

  const obj = helper.createWelcomeMessageObject();

  await shared.callPushHandler(obj, subscription);
}

