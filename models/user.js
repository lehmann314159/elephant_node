var database = require("../database");
var pg = require("pg");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

// Create
exports.add = function(req, res) {
	res.json(database.query(database.assemble({
		"action": "insert",
		"domain": "elephant_user",
		"parameters": req.body
	})));
};


// Read All
exports.find = function(req, res) {
	res.json(database.query(database.assemble({
		"action": "select",
		"domain": "elephant_user",
		"parameters": req.body
	})));
};


// Read by ID
exports.findById = function(req, res) {
	req.body = { "id": req.params.id};
	res.json(database.query(database.assemble({
		"action": "select",
		"domain": "elephant_user",
		"parameters": req.body
	})));
};


// Update
exports.update = function(req, res) {
	if (req.params.id) {
		req.body['id'] = req.params.id;
	}

	res.json(database.query(database.assemble({
		"action": "update",
		"domain": "elephant_user",
		"parameters": req.body
	})));
};


// Delete
exports.deleteById = function(req, res) {
	if (!req.params.id) {
		res.json("no id provided - no delete");
		return;
	}

	res.json(database.query(database.assemble({
		"action": "delete",
		"domain": "elephant_user",
		"parameters": { "id": req.params.id }
	})));
};


// Delete by key/value
exports.delete = function(req, res) {
	res.json(database.query(database.assemble({
		"action": "delete",
		"domain": "elephant_user",
		"parameters": req.body
	})));
};
