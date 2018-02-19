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

//serve static files - js css html images and so on
//app.use(serveStatic(path.join(appPath, '../public'), {'index':['form.html']}))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

// routes
//app.get('/', function (req, res) {
//  res.send('Hey, the app is working!');
//})

app.post('/api/save-subscription/', function (req, res) {

	console.log("from server ... ");
	console.log(req.body);
	console.log(req.body.endpoint);
	console.log(req.body.keys.auth);


	var name = req.body.name;
	var email = req.body.email;
	var team = req.body.team;
	var endpoint = req.body.endpoint;
	var expirationTime = req.body.expirationTime;
	var key256 = req.body.keys.p256dh;
	var keyAuth = req.body.keys.auth;
	
	controlDB.insert(appPath + '/db/', name, email, team, endpoint, expirationTime, key256, keyAuth );

})


app.listen(8080, 'localhost')


