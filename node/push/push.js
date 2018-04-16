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

    var message = validateRequest(req);

    if(message) {
        return getSubscriptionsFromDatabase()
        .then(function (subscriptions) {
            sendMsg(subscriptions, message);

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({'success': true}));
        })
        .catch(function (err){
            // server error, can't get subscriptions or send messages
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.status(500)
            res.send({'success': false});
        })
    } else {
        // invalid request - one of the required fields is empty
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({'success': false});
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

        webpush.sendNotification(subscription, message)
        .catch((err) => {
            if (err.statusCode === 410) {
                return removeSubscriptionFromDatabase(subscription);
            } else {
                console.log('Subscription is no longer valid: ', err);
            }
        })
       
    }
}

function getSubscriptionsFromDatabase(callback, message) {
    return new Promise(function (resolve, reject){   
        controlDB.getUsers(function(subscriptions) {
            resolve(subscriptions);
        })
    });
}

function removeSubscriptionFromDatabase(subscription) {
    controlDB.removeSubscription(subscription);
}

function validateRequest(req){
    // check if the request has the fields required: title, body, icon
    if (req.body.message) {
       var obj = JSON.parse(req.body.message);
       if (obj.title && obj.body && obj.icon) {
           return JSON.stringify(obj);
       } else {
           return null;
       }
    } else {
        return null;
    }
}


var push = {};
push.app = app;
push.getSubscriptionsFromDatabase = getSubscriptionsFromDatabase;
module.exports = push; // for testing
