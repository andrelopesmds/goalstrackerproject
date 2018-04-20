var sqlite3 = require('sqlite3').verbose();
var db;

exports.connect = function(path) { db = new sqlite3.Database(path + '/DB'); }

                  exports.createDB = function(path) {
    db = new sqlite3.Database(path + '/DB');

    db.run(
        "CREATE TABLE IF NOT EXISTS visitors (endpoint VARCHAR(250), expirationTime VARCHAR(50), key256 VARCHAR(250), keyAuth VARCHAR(250) , subscribeDate TEXT , unsubscribeDate TEXT )");
};

exports.insert = function(endpoint, expirationTime, key256, keyAuth) {
    var date = new Date();
    var dateISO = date.toISOString();

    var stmt = db.prepare("INSERT INTO visitors VALUES (?,?,?,?,?,?)");
    stmt.run(endpoint, expirationTime, key256, keyAuth, dateISO, null);
    stmt.finalize();
};

exports.select = function(path) {
    //  get all rows in DB
    var temp = new sqlite3.Database(path + '/DB');

    temp.serialize(function() {
        temp.each("SELECT * from visitors",
                  function(err, row) { console.log(row); });
    });

    temp.close();
};

exports.getSubscriptionDates =
    function(callback) {
    // get all subscription dates
    db.all("SELECT subscribeDate, unsubscribeDate from visitors",
           function(err, allRows) {
               if (err != null) {
                   console.log(err);
                   callback(err);
               }

               callback(allRows);
           });
}

    exports.getUsers =
        function(callback) {
    // get only active users
    db.all("SELECT * from visitors WHERE unsubscribeDate IS NULL",
           function(err, allRows) {
               if (err != null) {
                   console.log(err);
                   callback(err);
               }

               callback(allRows);
           });
}

        exports.removeSubscription =
            function(subscription) {
    var date = new Date();
    var dateISO = date.toISOString();

    db.run("UPDATE visitors SET unsubscribeDate = ? WHERE endpoint = ?",
           dateISO, subscription.endpoint);
}

            exports.getNumberOfUsers = function(callback) {
    // get the number of active users
    db.get("SELECT count(*) from visitors WHERE unsubscribeDate IS NULL",
           function(err, res) {
               if (err != null) {
                   console.log(err);
                   callback(err);
               }

               callback(res["count(*)"]);
           });
};
