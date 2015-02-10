var database = require('../database');
var pg = require('pg');

// Because this is my first javascript project as well as my first node project,
// I am doing this very ham-fistedly.
// TODO: abstract query-generators
// TODO: abstract database functionality

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

// Create
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
	console.log(myQuery);
	res.json(database.query(myQuery));
};


// Read
exports.findById = function(req, res) {
	var id = req.params.id;
	var myQuery = 'SELECT * FROM elephant_user WHERE id = ' + id;
	res.json(database.query(myQuery));
};


// Update
exports.update = function(req, res) {
	var id = req.params.id;
	if (!id) {
		res.json("no id provided - no update");
		return;
	}

	var updateString = "";
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			if (key != 'id') {
				if (!updateString) {
					updateString = key + " = '" + req.body[key]  + "'";
				} else {
					updateString += ", " + key + " = '" + req.body[key]  + "'";
				}
			}
		}
	}

	if (!updateString) {
		res.json("no updated fields provided - no update");
		return;
	}

	var myQuery = "UPDATE elephant_user SET " + updateString + " WHERE id = '" + id + "'";
	console.log(myQuery);
	res.json(database.query(myQuery));
};


// Delete
exports.delete = function(req, res) {
	// don't need to check this, since the server handles it, but it helps portability
	var id = req.params.id;
	if (!id) {
		res.json("no id provided - no delete");
		return;
	}

	var myQuery = "DELETE FROM elephant_user WHERE id = '" + id + "'";
	console.log(myQuery);
	res.json(database.query(myQuery));
};



///////////////////////
/* Specialized calls */
///////////////////////

// Read All
exports.findAll = function(req, res) {
	var myQuery = 'SELECT * FROM elephant_user';
	res.json(database.query(myQuery));
};

// Delete by key/value
exports.deleteByKVP = function(req, res) {
	var myQuery = "DELETE FROM elephant_user WHERE " + database.whereClause(req.body, true);
	console.log(myQuery);
	res.json(database.query(myQuery));
};
