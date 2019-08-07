const tableName = process.env.TABLE_NAME;

async function getSubscriptions(docClient) {
    return new Promise(function(resolve, reject) {
        var params = {
            TableName: tableName,
            ExpressionAttributeValues: {
                ":n": null
            },
            FilterExpression: "unsubscribeDate = :n"
        };

        docClient.scan(params, function(err, data) {
            if (err) throw err;

            resolve(data.Items);
        });
    });
}

async function removeInvalidSubscriptions(docClient, result) {
    return new Promise(function(resolve, reject) {
        // todo
        resolve();
    });
}

var controldb = {};
controldb.getSubscriptions = getSubscriptions;
controldb.removeInvalidSubscriptions = removeInvalidSubscriptions;
module.exports = controldb;
