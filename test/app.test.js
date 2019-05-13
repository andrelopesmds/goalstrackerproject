const assert = require('assert');
const server = require('../node/app/app.js');

var AWS = require('aws-sdk');
var AWSMock = require('aws-sdk-mock');
AWSMock.setSDKInstance(AWS);
 
AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
    callback(null, {
        statusCode: 201,
        message: 'Subscription successfully created!'
    });
});

const validSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    "expirationTime": null,
    "keys": {
        "p256dh": "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
        "auth": "GS_k7K70ihQtA1GvfAZ8wA=="
    }
};

const invalidSubscription = {
    "end": "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    "expirationTime": null,
    "keys": {
        "p256dh": "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
        "auth": "GS_k7K70ihQtA1GvfAZ8wA=="
    }
};

describe('App service', function() {
    it('should respond with bad request for invalid subscriptions', function() {
        server.handler(invalidSubscription, null, function(err, result) {
            assert.equal(result.statusCode, 400);
        });
    });

    it('should respond with created for a valid subscription', function() {
        server.handler(validSubscription, null, function(err, result) {
            assert.equal(result.statusCode, 201);
        });
    });
});
