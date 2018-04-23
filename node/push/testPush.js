// this script simulates a goal from atletico mg for test purposes
var request = require('request');

var json = {
    "body" : "Galo x Cruzeiro",
    "title" : "The game has started",
    "icon" : "images/ball.png"
}

var json2 = {
    "body" : "This is a test message",
    "title" : "Aqui é Galo",
    "icon" : "images/galo.png"
}

var msg = JSON.stringify(json2);

request.post(
    'http://localhost:3000', {form : {team : 'galo', message : msg}},
    function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:',
                    response &&
                        response.statusCode); // Print the response status code
                                              // if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
