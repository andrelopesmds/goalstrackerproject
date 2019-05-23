const AWS = require('aws-sdk');
const response = require('./response.js');
const subscriptionValidator = require('./subscription-validator.js');


exports.handler = function(event, context, callback) {
    const docClient = new AWS.DynamoDB.DocumentClient();

    if (!subscriptionValidator.isValid(event)) {
        callback(null, response.badRequest);
    } else {
        var parameters = createParameters(event);

        docClient.put(parameters, function(err, data) {
            if (err) {
                console.log(err);
                callback(null, response.internalError);
            }

            callback(null, response.created);
        });
    }
};

function createParameters(event) {
    let date = new Date();
    let dateISO = date.toISOString();

    let parameters = {
        TableName: process.env.tableName,
        Item: {
            "endpoint": event.endpoint,
            "expirationTime": event.expirationTime,
            "key256": event.keys.p256dh,
            "keyAuth": event.keys.auth,
            "subscribeDate": dateISO,
            "unsubscribeDate": null
        }
    };

    return parameters;
}