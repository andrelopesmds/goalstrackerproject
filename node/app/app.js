var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var validate = require('data-validate');
var controlDB = require('./controldb.js');
var appPath = __dirname;
const path = require('path');

// Connect to DB and create visitors table if it does't exist
// controlDB.createDB(appPath + '/db/');
controlDB.createdb();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.post('/api/save-subscription/', function(req, res) {
    var endpoint = req.body.endpoint;
    var expirationTime = req.body.expirationTime;
    var key256 = req.body.keys.p256dh;
    var keyAuth = req.body.keys.auth;

    // endpoint and keys are required, expirationTime is optional
    if (endpoint && key256 && keyAuth) {

        controlDB.insert(endpoint, expirationTime, key256, keyAuth);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success : true}));
    } else {

        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send(JSON.stringify({success : false}));
    }
})

app.get('/statistics/', function(req, res) {
    controlDB.getSubscriptionDates(function(data) {
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({'status' : 'success', 'data' : data}));
    });
})

app.listen(8080, 'localhost')

module.exports = app; // for testing
