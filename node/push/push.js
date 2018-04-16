const webpush = require('web-push');
var express = require('express')
var app = express()
var appPath = __dirname;
const path = require('path');
var bodyParser = require('body-parser')
var controlDB = require('../app/controldb.js');

controlDB.connect(path.join(appPath, '../app/db'));

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function(req, res) {

    Promise.all([
        validateRequest(req),
        getSubscriptionsFromDatabase()
    ])
    .then(function (data) {
        var message = data[0];
        var subscriptions = data[1];
        
        sendMsg(subscriptions, message);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({'success': true}));
        
    })
    .catch(function (err){
        // bad request
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({'success': false});
        console.log("Error: "+ err);
    })
  

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


function validateRequest(req){
    // check if the request has the fields required: title, body, icon
    return new Promise(function (resolve, reject) {
        var obj = JSON.parse(req.body.message);
        if (obj.title && obj.body && obj.icon) {
            resolve(JSON.stringify(obj));
        } else {
            reject("The request does not have the required fields");
            console.log(req.body);
        }
    });
}


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

function getSubscriptionsFromDatabase(callback, message) {
    return new Promise(function (resolve, reject){   
        controlDB.getUsers(function(subscriptions) {
            resolve(subscriptions);
        })
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
    }
}

function removeSubscriptionFromDatabase(subscription) {

    controlDB.removeSubscription(subscription);

}

var push = {};
push.app = app;
push.getSubscriptionsFromDatabase = getSubscriptionsFromDatabase;
module.exports = push; // for testing
