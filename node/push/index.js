const webpush = require('web-push');
const logger = require('npmlog');
const helper = require('./helper');
const dynamodb = require('../lib/dynamodb');

const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:sigaogalo@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

module.exports.handler = async (event) => {
  try {
    await sendPushNotification(event);
  } catch (error) {
    logger.info(`Error when sending push notification: ${JSON.stringify(error)}. Event: ${JSON.stringify(event)}`);
    throw error;
  }
  logger.info('operation concluded!');
};

async function sendPushNotification(event) {
  const message = JSON.parse(event.Records[0].Sns.Message);

  const { subscription } = message;
  const payload = helper.createPayload(message.obj);

  try {
    const result = await webpush.sendNotification(subscription, payload);
    logger.info(`Message sent: ${JSON.stringify(result)}`);
  } catch (error) {
    logger.info(`Error when sending the message: ${JSON.stringify(error)}`);

    if (error.statusCode === 410) {
      await dynamodb.deleteSubscription(subscription);
      logger.info('User unsubscribed!');
    } else {
      throw error;
    }
  }
}
