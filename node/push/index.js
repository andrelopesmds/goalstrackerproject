'use strict';

const helper = require('./helper');
const webpush = require('web-push');
const dynamodb = require('../lib/dynamodb');

const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
    `mailto:sigaogalo@gmail.com`,
    vapidKeys.publicKey,
    vapidKeys.privateKey,
);

module.exports.handler = async (event) => {
  try {
    await sendPushNotification(event);
  } catch (error) {
    console.log(`Error when sending push notification: ${JSON.stringify(error)}`);
    throw error;
  }
  console.log('operation concluded!');
};

async function sendPushNotification(event) {
  const subscription = event.subscription;
  const payload = helper.createPayload(event);

  try {
    const result = await webpush.sendNotification(subscription, payload);
    console.log(`Message is sent: ${JSON.stringify(result)}`);
  } catch (error) {
    if (error.statusCode === 410) {
      await dynamodb.deleteSubscription(subscription);
      console.log('User is unsubscribed!');
    } else {
      throw error;
    }
  }
};
