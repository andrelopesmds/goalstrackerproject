const AWS       = require('aws-sdk');
const assert    = require('assert');
const constants = require('./constants.js');
const push      = require('../push.js');
const response  = require('../response.js');

var AWSMock = require('aws-sdk-mock');
AWSMock.setSDKInstance(AWS);

AWSMock.mock('DynamoDB.DocumentClient', 'scan', function(params, callback) {
    callback(null, {
        Items: [
            constants.validSubscription,
            constants.invalidSubscription
        ]
    });
});

describe('Push service', function() {
    it('Should import module/functions/constants correctly', function() {
        assert.equal(typeof constants, 'object');
        assert.equal(typeof constants.validSubscription, 'object');
        assert.equal(typeof push, 'object');
        assert.equal(typeof push.handler, 'function');
    });

    it('Should respond with bad request for invalid inputs', async function() {
        var result = await push.handler('');

        assert.equal(result.statusCode, 400);
        assert.equal(result.message, 'Bad request');
    });

     it('Should respond with status created for valid inputs', async function() {
        var result = await push.handler(constants.validInput);

        assert.equal(result.statusCode, response.ok.statusCode);
        assert.equal(result.message, response.ok.message);
    }); 
});
