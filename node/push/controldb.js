var AWS = require("aws-sdk");

var tableName = "VisitorsTest";

if (process.env.NODE_ENV == "production") {
    tableName = "Visitors";
}

AWS.config.update({
    region : "us-east-1",
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});
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

        console.log("1 visitor updated!");
    });
}
