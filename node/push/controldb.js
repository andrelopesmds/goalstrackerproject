var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbName = "mydb";
var collectionName = "visitors";
var dbo;

exports.connect =
    function() {
    MongoClient.connect(url, function(err, db) {
        if (err)
            throw err;
        dbo = db.db(dbName);
        console.log("Connected to collection ", collectionName);
    });
}

    exports.getUsers =
        function(callback) {
    var query = {unsubscribeDate : null};
    dbo.collection(collectionName).find(query).toArray(function(err, result) {
        if (err)
            throw err;
        callback(result);
    });
}

        exports.removeSubscription = function(id) {
    var date = new Date();
    var dateISO = date.toISOString();

    var query = {_id : id};
    var newvalues = {$set : {unsubscribeDate : dateISO}};
    dbo.collection(collectionName)
        .updateOne(query, newvalues, function(err, res) {
            if (err)
                throw err;
            console.log("User successfully unsubscribed!");
        });
}
