const reflect = require('./reflect.js');
const webpush = require('web-push');

const contact = process.env.EMAIL;

const vapidKeys = {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
    `mailto:${contact}`,
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

async function sendMsg(data, message) {
   return new Promise(function (resolve, reject) { 
        var payload = JSON.stringify(message);
        var promises = [];

        for (let i = 0; i < data.length; i++) {
            const endpoint = data[i].endpoint;
            const subscription = {
                "endpoint": data[i].endpoint,
                "expirationTime": data[i].expirationTime,
                "keys": {
                    "p256dh": data[i].key256,
                    "auth": data[i].keyAuth
                }
            }

            promises.push(webpush.sendNotification(subscription, payload));
        }

        Promise.all(promises.map(reflect))
        .then(result => resolve(result));
    });
}

module.exports = sendMsg;
