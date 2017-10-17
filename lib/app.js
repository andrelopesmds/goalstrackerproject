var express = require('express')
var app = express()
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var validate = require('data-validate');
var controlDB = require('./controlDB.js');

// create DB and table if they don't exist
controlDB.createDB();

// routes
app.get('/', function (req, res) {
  res.send('Hey, the app is working!');
})

app.get('/form', function (req, res){
  displayForm(res);
});

app.post('/form', function(req, res){
  processForm(req, res);
});

app.listen(3000);

function displayForm(res){
  fs.readFile('../public/form.html', function(err, data){
    res.writeHead(200, {
      'Content-Type':'text/html',
         'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
}

function processForm(req, res) {
 
   var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

	var name = fields.name;
	var email = fields.email;
	var team = fields.team;

	var checks = {
		"Name is valid." : validate.notNull()(name),
		"Email is valid.": validate.isEmail()(email),
		"Team is valid." : validate.notNull()(team)
	};

	var allTrue = Object.keys(checks).every(function(k){return checks[k]});

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
	if (allTrue){

		controlDB.insert(name, email, team);

		res.write('Thank you for subscribe '+name+'!');
	}
	else{
		res.write('The input data is not allowed! Please, try again.');
	}
	res.end();
    });
}

