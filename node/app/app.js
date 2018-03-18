var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var validate = require('data-validate');
var controlDB = require('./controlDB.js');
var appPath = __dirname;
const path = require('path');

// create DB and table if they don't exist
controlDB.createDB(appPath + '/db/');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.post('/api/save-subscription/', function(req, res) {

    console.log("from server ... ");
    console.log(req.body);
    console.log(req.body.endpoint);
    console.log(req.body.keys.auth);

    var endpoint = req.body.endpoint;
    var expirationTime = req.body.expirationTime;
    var key256 = req.body.keys.p256dh;
    var keyAuth = req.body.keys.auth;

    controlDB.insert(appPath + '/db/', endpoint, expirationTime, key256, keyAuth);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        data: {
            success: true
        }
    }));

})


app.listen(8080, 'localhost')

