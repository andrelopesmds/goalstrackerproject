var AWS = require("aws-sdk");

AWS.config.update({region : "us-east-1"});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Visitors",
    KeySchema : [
        {AttributeName : "endpoint", KeyType : "HASH"} // Partition key
    ],
    AttributeDefinitions :
        [ {AttributeName : "endpoint", AttributeType : "S"} ],
    ProvisionedThroughput : {ReadCapacityUnits : 2, WriteCapacityUnits : 2}
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:",
                      JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:",
                    JSON.stringify(data, null, 2));
    }
});
