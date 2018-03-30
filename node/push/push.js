const webpush = require('web-push');
var express = require('express')
var app = express()
var appPath = __dirname;
const path = require('path');
var bodyParser = require('body-parser')
var controlDB = require('../app/controlDB.js');

controlDB.connect(path.join(appPath, '../app/db'));


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function(req, res) {

    var team = req.body.team;
    var message = req.body.message;

    if (team && message){

        getSubscriptionsFromDatabase(sendMsg, message);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'success': true }));
    } else {

        // bad request
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({ 'success': false });
    }

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

    controlDB.getUsers(function(subscriptions) {

        callback(subscriptions, teste);
    });


}

function sendMsg(data, message) {

    console.log(data);
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

    }
}

function removeSubscriptionFromDatabase(subscription) {

    controlDB.removeSubscription(subscription);

}

module.exports = app; // for testing
