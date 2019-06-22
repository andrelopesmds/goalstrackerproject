const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.getUsers = function(callback) {
    var params = {
        TableName: tableName,
        ExpressionAttributeValues: {
            ":n": null
        },
        FilterExpression: "unsubscribeDate = :n"
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            callback(data.Items);
        }
    });
}

exports.getUser = function(endpoint, callback) {
    var params = {
        TableName: tableName,
        ExpressionAttributeValues: {
            ":n": endpoint
        },
        FilterExpression: "endpoint = :n"
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            callback(data.Items);
        }
    });
}

exports.removeSubscription = function(endpoint) {
    var date = new Date();
    var dateISO = date.toISOString();
    var params = {
        TableName: tableName,
        Key: {
            "endpoint": endpoint
        },
        ExpressionAttributeValues: {
            ":x": dateISO
        },
        UpdateExpression: "set unsubscribeDate = :x"
    };

    docClient.update(params, function(err, data) {
        if (err)
            throw err;

        console.log("1 visitor updated!");
    });
}
