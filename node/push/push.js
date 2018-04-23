const webpush = require('web-push');
var express = require('express')
var app = express()
var appPath = __dirname;
const path = require('path');
var bodyParser = require('body-parser')
var controlDB = require('../app/controldb.js');

controlDB.connect(path.join(appPath, '../app/db'));

app.use(bodyParser.urlencoded({extended : false}));
app.post('/', function(req, res) {
    var message = validateRequest(req);

    if (message) {
        return getSubscriptionsFromDatabase()
            .then(function(subscriptions) {
                return sendMsg(subscriptions, message);
            })
            .then(function(result){
                console.log("result: ", result);

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({'success' : true}));
            })
            .catch(function(err) {
                // server error, can't get subscriptions or send messages
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500)
                res.send({'success' : false});
            })
    } else {
        // invalid request - one of the required fields is empty
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({'success' : false});
    }
})

app.listen(3000, 'localhost')

const vapidKeys = {
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY
};

webpush.setVapidDetails('mailto:web-push-book@gauntface.com',
                        vapidKeys.publicKey, vapidKeys.privateKey);

function sendMsg(data, message) {

    var promises = [];

    for (let i = 0; i < data.length; i++) {

        const subscription =
        {
            "endpoint" : data[i].endpoint,
            "expirationTime" : data[i].expirationTime,
            "keys" : {"p256dh" : data[i].key256, "auth" : data[i].keyAuth}
        }
        var promise = 
            webpush.sendNotification(subscription, message)
            .then((resp) => {return resp.statusCode;})
            .catch((err) => {
                if (err.statusCode === 410) {
                    try {
                        return removeSubscriptionFromDatabase(subscription);
                    } catch(e) {
                        console.log("can not remove subscription: ", e);
                    }
                } else {
                    console.log('Subscription is no longer valid: ', err);
                }
                return err.statusCode;
            })
        promises.push(promise);
    }
    return Promise.all(promise);
}

function getSubscriptionsFromDatabase() {
    return new Promise(function(resolve, reject) {
        controlDB.getUsers(function(subscriptions) { resolve(subscriptions); })
    });
}

function removeSubscriptionFromDatabase(subscription) {
    controlDB.removeSubscription(subscription);
}

function validateRequest(req) {
    // check if the request has the fields required: title, body, icon
    if (req.body.message) {
        try {
            var obj = JSON.parse(req.body.message);
            if (obj.title && obj.body && obj.icon) {
                return JSON.stringify(obj);
            } else {
                return null;
            }
        } catch(e){
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
