const AWS = require('aws-sdk');
const response = require('./response.js');
const subscriptionValidator = require('./subscription-validator.js');


exports.handler = async (event) => {
    try {
        var result = await subscribe(event);
    }
    catch (err) {
        console.log(err);
        return err;
    }
    return result;
};

async function subscribe(event) {
    return new Promise((resolve, reject) => {
        const docClient = new AWS.DynamoDB.DocumentClient();

        if (!subscriptionValidator.isValid(event)) {
            reject(response.badRequest);
        } else {
            let parameters = createParameters(event);

            docClient.put(parameters, function(err, data) {
                if (err) {
                    reject(response.internalError);
                }

                resolve(response.created);
            });
        }
    });
}



function createParameters(event) {
    let date = new Date();
    let dateISO = date.toISOString();

    let parameters = {
        TableName: process.env.tableName,
        Item: {
            'endpoint': event.endpoint,
            'expirationTime': event.expirationTime,
            'key256': event.keys.p256dh,
            'keyAuth': event.keys.auth,
            'subscribeDate': dateISO,
            'unsubscribeDate': null
        }
    };

    return parameters;
}
