var request = require('request');

var json = {
    "body": "The match has just started!",
    "title": "HIFK x Pelicans",
    "icon": "images/hifk.png"
}

var msg = JSON.stringify(json);

request.post('http://localhost:3001', {
        form: {
            message: msg
        }
    },
    function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });