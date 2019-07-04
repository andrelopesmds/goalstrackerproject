const controlDB  = require('./controldb.js');
const webpush    = require('web-push');

const vapidKeys = {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


exports.handler = function (event, context, callback) {
    let message = validateRequest(event);

    if (message) {
        return getSubscriptionsFromDatabase()
            .then(subscriptions => {
                return sendMsg(subscriptions, message);
            })
            .catch(err => {
                console.log(err);

                callback(err, null);
            });
    } else {
        callback(null, "Bad request");
    }
}

function sendMsg(data, message) {
   return new Promise(function (resolve, reject) { 
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

            promises.push(webpush.sendNotification(subscription, message));
        }

        Promise.all(promises)
            .catch(err => {
                if (err && err.endpoint && err.statusCode && err.statusCode === 410) {
                    return removeSubscriptionFromDatabase(err.endpoint);
                } else {
                    console.log('Subscription is no longer valid: ', err);
                }
            })
            .then(() => {
                resolve(true);
            });
    });
}

function getSubscriptionsFromDatabase() {
    return new Promise(function(resolve, reject) {
        controlDB.getUsers(function(subscriptions) {
            resolve(subscriptions);
        })
    });
}

function removeSubscriptionFromDatabase(subscription) {
    controlDB.removeSubscription(subscription);
}

function validateRequest(obj) {
    if (obj) {
        if (obj.title && obj.body && obj.icon) {
            return JSON.stringify(obj);
        } else {
            return null;
        }
    } else {
        return null;
    }
}
