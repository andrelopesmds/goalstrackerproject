const webpush = require('web-push');
var express = require('express')
var app = express()
var appPath = __dirname;
const path = require('path');
var bodyParser = require('body-parser')
var controlDB = require('../app/controlDB.js');

app.use(bodyParser.urlencoded({
    extended: false
}));

// routes
app.post('/', function(req, res) {
    var team = req.body.team;
    var message = req.body.message;
    res.send(team + ' :  ' + message + '!');

    getSubscriptionsFromDatabase(sendMsg, message);

})

app.listen(3000, 'localhost')


const vapidKeys = {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

function triggerPushMsg(subscription, dataToSend) {
    return webpush.sendNotification(subscription, dataToSend)
        .catch((err) => {
            if (err.statusCode === 410) {
                return removeSubscriptionFromDatabase(subscription);
            } else {
                console.log('Subscription is no longer valid: ', err);
            }
        });
};

function getSubscriptionsFromDatabase(callback, teste) {

    controlDB.getUsers(path.join(appPath, '../app/db'), function(subscriptions) {

        callback(subscriptions, teste);

    });


}

function sendMsg(data, message) {

    for (let i = 0; i < data.length; i++) {

        const subscription = {
            "endpoint": data[i].endpoint,
            "expirationTime": data[i].expirationTime,
            "keys": {
                "p256dh": data[i].key256,
                "auth": data[i].keyAuth
            }
        }

        triggerPushMsg(subscription, message);

        console.log(data[i]);
        console.log(message);

    }
}

function removeSubscriptionFromDatabase(subscription) {

    controlDB.removeSubscription(path.join(appPath, '../app/db'), subscription);

}
