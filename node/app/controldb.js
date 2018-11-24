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

exports.insert =
    function(endpoint, expirationTime, key256, keyAuth) {
    var date = new Date();
    var dateISO = date.toISOString();

    var params = {
        TableName : tableName,
        Item : {
            "endpoint" : endpoint,
            "expirationTime" : expirationTime,
            "key256" : key256,
            "keyAuth" : keyAuth,
            "subscribeDate" : dateISO,
            "unsubscribeDate" : null
        }
    };

    docClient.put(params, function(err, data) {
        if (err)
            throw err;
        console.log("1 visitor inserted!");
    });
}

    exports.getSubscriptionDates = function(callback) {
    var params = {TableName : tableName};

    docClient.scan(params, function(err, data) {
        if (err)
            throw err;
        callback(data.Items);
    });
}
