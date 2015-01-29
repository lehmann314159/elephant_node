var pg = require('pg');

// Because this is my first javascript project as well as my first node project,
// I am doing this very ham-fistedly.
// TODO: abstract query-generators
// TODO: abstract database functionality

exports.findAll = function(req, res) {
	var myQuery = 'SELECT * FROM elephant_user';
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(myQuery, function(err, result) {
			done();
			if(err) {
				return console.error(err);
			}
			console.log(result.rows);
			res.json(result.rows);
		});
	})
};

exports.findById = function(req, res) {
	var id = req.params.id;
	var myQuery = 'SELECT * FROM elephant_user WHERE id = ' + id;
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(myQuery, function(err, result) {
			done();
			if(err) {
				return console.error(err);
			}
			console.log(result.rows);
			res.json(result.rows);
		});
	})
};

exports.add = function(req, res) {
	var keys = [];
	var values = [];
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			keys.push(key);
			values.push("'" + req.body[key] + "'");
		}
	}
	var myQuery = "INSERT INTO elephant_user ";
	myQuery += "(" + keys.toString() + ") VALUES (" + values.toString() + ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(myQuery, function(err, result) {
			done();
			if(err) {
				return console.error(err);
			}
			console.log(result.rows);
			res.send("User added");
		});
	})
};

exports.update = function(req, res) {
	var id = req.params.id;
	if (!id) {
		res.send("no id provided - no update");
		return;
	}

	var updateString = "";
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			if (key != 'id') {
				if (!updateString) {
					updateString = key + " = '" + req.body[key]  + "'";
				} else {
					updateString += " AND " + key + " = '" + req.body[key]  + "'";
				}
			}
		}
	}

	if (!updateString) {
		res.send("no updated fields provided - no update");
		return;
	}

	var myQuery = "UPDATE elephant_user SET " + updateString + " WHERE id = '" + id + "'";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(myQuery, function(err, result) {
			done();
			if(err) {
				return console.error(err);
			}
			console.log(result.rows);
			res.send("User updated");
		});
	})
};

exports.delete = function(req, res) {
	// don't need to check this, since the server handles it, but it helps portability
	var id = req.params.id;
	if (!id) {
		res.send("no id provided - no delete");
		return;
	}

	var myQuery = "DELETE FROM elephant_user WHERE id = '" + id + "'";
	//res.send(myQuery); return;
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(myQuery, function(err, result) {
			done();
			if(err) {
				return console.error(err);
			}
			console.log(result.rows);
			res.send("User deleted");
		});
	})
};
