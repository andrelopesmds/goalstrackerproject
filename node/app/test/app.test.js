const AWS       = require('aws-sdk');
const app       = require('../app.js');
const assert    = require('assert');
const chai      = require('chai');
const constants = require('./constants.js');
const expect    = chai.expect;
const response  = require('../response.js');

var AWSMock = require('aws-sdk-mock');
AWSMock.setSDKInstance(AWS);

AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
    callback(null, {
        statusCode: 201,
        message: 'Subscription successfully created!'
    });
});


describe('App service', function() {
    it('should import module/constants correctly', function() {
        assert.equal(typeof app, 'object');
        assert.equal(typeof app.handler, 'function');
        assert.equal(typeof constants, 'object');
        assert.equal(typeof constants.validSubscriptions, 'object');
        assert.equal(typeof constants.invalidSubscriptions, 'object');
        expect(constants.validSubscriptions.length).to.be.above(0);
        expect(constants.invalidSubscriptions.length).to.be.above(0);
    });
    
    it('should respond with bad request for invalid subscriptions', async function() {
        for(const subscription of constants.invalidSubscriptions) {
            const result = await app.handler(subscription);
            assert.equal(result.statusCode, response.badRequest.statusCode);
        };
    });
 
    it('should respond with created for a valid subscriptions', async function() {
        for(const subscription of constants.validSubscriptions) {
            const result = await app.handler(subscription);
            assert.equal(result.statusCode, response.created.statusCode);
        }
    });   
});
