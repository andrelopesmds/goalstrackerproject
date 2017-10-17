var sqlite3 = require('sqlite3').verbose();

exports.createDB = function(){

	var db = new sqlite3.Database('DB');

	db.run("CREATE TABLE IF NOT EXISTS visitors (name VARCHAR(50), email VARCHAR(50), team VARCHAR(50))");

	db.close();
};

exports.insert = function(name, email, team){

	var db = new sqlite3.Database('DB');

	var stmt = db.prepare("INSERT INTO visitors VALUES (?,?,?)");

	stmt.run(name,email,team);

	stmt.finalize();

	db.close();
};

exports.select = function(){

	var db = new sqlite3.Database('DB');

	db.serialize(function(){

		db.each("SELECT * from visitors", function(err, row){					console.log(row);
		});
	});	

	db.close();

};


