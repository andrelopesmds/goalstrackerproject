var request = require('request');

var json = {
    "body": "This is a test message",
    "title": "Aqui é Galo",
    "icon": "images/galo.png"
}

var msg = JSON.stringify(json);

request.post('http://localhost:3000', {
        form: {
            team: 'galo',
            message: msg
        }
    },
    function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });