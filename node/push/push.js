const bodyParser = require('body-parser')
const controlDB  = require('./controldb.js');
const express    = require('express')
const webpush    = require('web-push');

const app = express()
const PORT = 8080;


const vapidKeys = {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/', function(req, res) {
    let message = validateRequest(req);

    if (message) {
        return getSubscriptionsFromDatabase()
            .then(subscriptions => {
                sendMsg(subscriptions, message);

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    'success': true
                }));
            })
            .catch(err => {
                console.log(err);

                res.setHeader('Content-Type', 'application/json');
                res.status(500)
                res.send({
                    'success': false
                });
            })
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({
            'success': false
        });
    }
})

app.post('/welcomeMessage', function(req, res) {
    let endpoint = req.body.endpoint;
    let message = req.body.message;

    if (endpoint && message) {
        return getSubscriptionFromDatabase(endpoint)
            .then(subscriptions => {
                sendMsg(subscriptions, message);

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    'success': true
                }));
            })
            .catch(err => {
                console.log(err);

                res.setHeader('Content-Type', 'application/json');
                res.status(500)
                res.send({
                    'success': false
                });
            });

    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send({
            'success': false
        });
    }
})

app.listen(PORT)

function sendMsg(data, message) {
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

        webpush.sendNotification(subscription, message)
            .catch((err) => {
                if (err.statusCode === 410) {
                    return removeSubscriptionFromDatabase(endpoint);
                } else {
                    console.log('Subscription is no longer valid: ', err);
                }
            })
    }
}

function getSubscriptionsFromDatabase() {
    return new Promise(function(resolve, reject) {
        controlDB.getUsers(function(subscriptions) {
            resolve(subscriptions);
        })
    });
}

function getSubscriptionFromDatabase(endpoint) {
    return new Promise(function(resolve, reject) {
        controlDB.getUser(endpoint, function(subscriptions) {
            resolve(subscriptions);
        })
    });
}

function removeSubscriptionFromDatabase(subscription) {
    controlDB.removeSubscription(subscription);
}

function validateRequest(req) {
    if (req.body.message) {
        let obj = JSON.parse(req.body.message);
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
