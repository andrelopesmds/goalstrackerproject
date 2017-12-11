var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
//var fs = require('fs');
//var formidable = require("formidable");
//var util = require('util');
var validate = require('data-validate');
var controlDB = require('./controlDB.js');
var appPath = __dirname;
const path = require('path');

// create DB and table if they don't exist
controlDB.createDB(appPath);

//serve static files - js css html images and so on
app.use(serveStatic(path.join(appPath, '../public'), {'index':['form.html']}))

app.use(bodyParser.urlencoded({ extended: false}));

// routes
app.get('/', function (req, res) {
  res.send('Hey, the app is working!');
})

//app.post('/', function(req, res){
//  processForm(req, res);
//})
// we are going to send post info at the same time we send browser info

app.listen(8080, 'localhost')


function processForm(req, res){
	
	var name = req.body.name;
	var email = req.body.email;
	var team = req.body.team;

	var checks = {
		"Name is valid." : validate.notNull()(name),
		"Email is valid.": validate.isEmail()(email),
		"Team is valid." : validate.notNull()(team)	};

	var allTrue = Object.keys(checks).every(function(k){return checks[k]});

        res.writeHead(200, { 'content-type': 'text/plain' });
	if (allTrue){

		controlDB.insert(appPath, name, email, team);
		res.write('Thank you for subscribe '+name+'!');
	}else{
		res.write('The input data is not allowed! Please, try again.');
	}
	res.end();
}

