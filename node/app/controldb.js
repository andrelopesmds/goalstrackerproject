var AWS = require("aws-sdk");

const tableName = "Visitors";

AWS.config.update({
    region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.insert = function(endpoint, expirationTime, key256, keyAuth) {
    var date = new Date();
    var dateISO = date.toISOString();

    var params = {
        TableName: tableName,
        Item: {
            "endpoint": endpoint,
            "expirationTime": expirationTime,
            "key256": key256,
            "keyAuth": keyAuth,
            "subscribeDate": dateISO,
            "unsubscribeDate": null
        }
    };

    docClient.put(params, function(err, data) {
        if(err)
            throw err;
        console.log("1 visitor inserted!");
    }); 
}

exports.getSubscriptionDates = function(callback) {
    var params = {
        TableName: tableName
    };


    docClient.scan(params, function(err, data) {
        if(err)
            throw err;
        callback(data.Items);
    });
}

