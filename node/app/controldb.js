var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbName = "mydb";
var collectionName = "visitors";
var dbo;

exports.createdb =
    function() {
    MongoClient.connect(url, function(err, db) {
        if (err)
            throw err;
        dbo = db.db(dbName);
        dbo.createCollection(collectionName, function(err, res) {
            if (err)
                throw err;
            console.log("Created/connected to collection Users!");
        });
    });
}

    exports.insert =
        function(endpoint, expirationTime, key256, keyAuth) {
    var date = new Date();
    var dateISO = date.toISOString();

    var myObj = {
        endpoint : endpoint,
        expirationTime : expirationTime,
        key256 : key256,
        keyAuth : keyAuth,
        subscribeDate : dateISO,
        unsubscribeDate : null
    };
    dbo.collection(collectionName).insertOne(myObj, function(err, res) {
        if (err)
            throw err;
        console.log("1 visitor inserted");
    });
}

        exports.getSubscriptionDates =
            function(callback) {
    var projection = {
        projection : {_id : 0, subscribeDate : 1, unsubscribeDate : 1}
    };
    dbo.collection(collectionName)
        .find({}, projection)
        .toArray(function(err, result) {
            if (err)
                throw err;
            callback(result);
        });
}

            exports.select = function() {
    var dbo;
    MongoClient.connect(url, function(err, db) {
        if (err)
            throw err;
        dbo = db.db(dbName);
        dbo.collection(collectionName)
            .find({}, {_id : 0})
            .toArray(function(err, result) {
                if (err)
                    throw err;
                console.log(result);
            });
    });
}
