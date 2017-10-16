var express = require('express')
var app = express()
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var validate = require('data-validate');

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

        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
	
	var checks = {
		"Name is valid." : validate.notNull()(fields.name),
		"Email is valid.": validate.isEmail()(fields.email),
		"Team is valid." : validate.notNull()(fields.team)
	};

	var allTrue = Object.keys(checks).every(function(k){return checks[k]});

	console.log("The name is: " + fields.name);
	console.log("The email is: "+ fields.email);
	console.log("The team is: "+fields.team);

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
	if (allTrue){res.write('Thank you for subscribe!');}
	else{res.write('The input data is not allowed! Please, try again.');}
	res.end();
    });
}

