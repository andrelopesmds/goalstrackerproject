const subscriber = require('../subscriber/index.js');
const assert = require('assert');
const AWS = require('aws-sdk-mock');

AWS.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
  callback(null, 'successfully put item in database');
});


describe('Subscriber service', function() {
  it('should import module correctly', function() {
    assert.equal(typeof subscriber, 'object');
  });

  it('should subscribe a user', async function() {
    const event = {
      body: JSON.stringify({
        endpoint: 'ewjvgkrewgwr',
      }),
    };

    const result = await subscriber.handler(event);
    assert.equal(result.statusCode, 200);
  });
});
