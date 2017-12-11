var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var validate = require('data-validate');
var controlDB = require('./controlDB.js');
var appPath = __dirname;
const path = require('path');

// create DB and table if they don't exist
controlDB.createDB(appPath);

//serve static files - js css html images and so on
app.use(serveStatic(path.join(appPath, '../public'), {'index':['form.html']}))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

// routes
//app.get('/', function (req, res) {
//  res.send('Hey, the app is working!');
//})

app.post('/api/save-subscription/', function (req, res) {

	console.log("from server ... ");
	console.log(req.body);
	res.send('ok');
	res.end();
})


app.listen(8080, 'localhost')


