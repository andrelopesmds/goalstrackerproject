var AWS = require("aws-sdk");

const tableName = "Visitors";

AWS.config.update({region : "us-east-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getUsers =
    function(callback) {
    var params = {
        TableName : tableName,
        ExpressionAttributeValues : {":n" : null},
        FilterExpression : "unsubscribeDate = :n"
    };

    docClient.scan(params, function(err, data) {
        if (err)
            throw err;
        callback(data.Items);
    });
}

    exports.removeSubscription = function(endpoint) {
    var date = new Date();
    var dateISO = date.toISOString();
    var params = {
        TableName : tableName,
        Key : {"endpoint" : endpoint},
        ExpressionAttributeValues : {":x" : dateISO},
        UpdateExpression : "set unsubscribeDate = :x"
    };

    docClient.update(params, function(err, data) {
        if (err)
            throw err;

        console.log(data);
    });
}
