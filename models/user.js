var database = require("../database");
var pg = require("pg");

// Because this is my first javascript project as well as my first node project,
// I am doing this very ham-fistedly.
// TODO: abstract query-generators
// TODO: abstract database functionality

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

// Create
exports.add = function(req, res) {
	var myQuery = "INSERT INTO elephant_user " + database.valuesClause(req.body);
	console.log(myQuery);
	res.json(database.query(myQuery));
};


// Read
exports.findById = function(req, res) {
	var id = req.params.id;
	var myQuery = "SELECT * FROM elephant_user " + database.whereClause(id);
	res.json(database.query(myQuery));
};


// Update
exports.update = function(req, res) {
	var id = req.params.id;
	if (!id) {
		res.json("no id provided - no update");
		return;
	}

	var myQuery = "UPDATE elephant_user " + database.setClause(req.body)
		+ database.whereClause(id);
	console.log(myQuery);
	res.json(database.query(myQuery));
};


// Delete
exports.delete = function(req, res) {
	// I don't strictky need to check this, since the server handles it.
	// But it helps portability.
	var id = req.params.id;
	if (!id) {
		res.json("no id provided - no delete");
		return;
	}

	var myQuery = "DELETE FROM elephant_user " + database.whereClause(req.body);
	console.log(myQuery);
	res.json(database.query(myQuery));
};



///////////////////////
/* Specialized calls */
///////////////////////

// Read All
exports.findAll = function(req, res) {
	var myQuery = "SELECT * FROM elephant_user";
	res.json(database.query(myQuery));
};

// Delete by key/value
exports.deleteByKVP = function(req, res) {
	var myQuery = "DELETE FROM elephant_user " + database.whereClause(req.body, true);
	console.log(myQuery);
	res.json(database.query(myQuery));
};
