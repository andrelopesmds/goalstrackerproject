const webpush = require('web-push');
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
    console.log(`Correlation-id: ${event.headers['x-correlation-id']}`);
    await sendPushNotification(event);
  } catch (error) {
    console.log(`Error when sending push notification: ${JSON.stringify(error)}. Event: ${event}`);
    throw error;
  }
  console.log('operation concluded!');
};

async function sendPushNotification(event) {
  const { subscription } = event;
  const payload = helper.createPayload(event.obj);

  try {
    const result = await webpush.sendNotification(subscription, payload);
    console.log(`Message sent: ${JSON.stringify(result)}`);
  } catch (error) {
    console.log(`Error when sending the message: ${JSON.stringify(error)}`);

    if (error.statusCode === 410) {
      await dynamodb.deleteSubscription(subscription);
      console.log('User unsubscribed!');
    } else {
      throw error;
    }
  }
}
