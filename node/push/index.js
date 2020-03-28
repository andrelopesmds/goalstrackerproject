'use strict';

const helper = require('./helper');
const webpush = require('web-push');

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
  const payload = helper.createPayload(event);

  const result = await webpush.sendNotification(event.subscription, payload);
  console.log(result);
};
