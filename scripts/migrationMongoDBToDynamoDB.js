var AWS = require("aws-sdk");
const tableName = "Visitors";

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = "mydb";
var collectionName = "visitors";
var dbo;

AWS.config.update({
    region : "us-east-1",
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

var docClient = new AWS.DynamoDB.DocumentClient();

MongoClient.connect(url, function(err, db) {
    if (err)
        throw err;
    dbo = db.db(dbName);
    dbo.collection(collectionName).find({}, {}).toArray(function(err, result) {
        if (err)
            throw err;

        InsertIntoDynamoDB(result);
    });
});

function InsertIntoDynamoDB(data) {
    var params = {TableName : tableName};
    for (let i = 0; i < data.length; i++) {
        params.Item = {
            "endpoint" : data[i].endpoint,
            "expirationTime" : data[i].expirationTime,
            "key256" : data[i].key256,
            "keyAuth" : data[i].keyAuth,
            "subscribeDate" : data[i].subscribeDate,
            "unsubscribeDate" : data[i].unsubscribeDate
        };
        docClient.put(params, function(err, data) {
            if (err)
                console.log("erro: ", err);

            console.log("1 visitor inserted!");
        });
    }
}
