var express = require('express')
var app = express()
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

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
  fs.readFile('form.html', function(err, data){
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
	console.log("The name is: " + fields.name);
	console.log("The email is: "+ fields.email);
	console.log("The team is: "+fields.team);


        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('Thank you for subscribe!');
	res.end();
    });
}

