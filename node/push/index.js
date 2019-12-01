'use strict';

const webpush = require('web-push');

const vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
};

webpush.setVapidDetails(
    `mailto:sigaogalo@gmail.com`,
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

module.exports.handler = async (event) => {
    try {
        await sendPushNotification(event);
    } catch (error) {
        console.log(`Error when sending push notification: ${JSON.stringify(error)}`);
        throw error;
    }
    console.log('This is working');
    console.log(JSON.stringify(event));
};

async function sendPushNotification(event) {
    let message = {
        title: event.obj.score,
        body: event.obj.team1
    }
    var payload = JSON.stringify(message);

    const result = await webpush.sendNotification(event.subscription, payload);
    console.log(result);
}