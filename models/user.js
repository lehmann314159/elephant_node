var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	res.json(database.genericCreate("elephant_user", req.body));
};


/* Read All */
exports.find = function(req, res) {
	res.send(database.genericRead("elephant_user", req.body));
};


/* Read by ID */
exports.findById = function(req, res) {
	req.body = { "id": req.params.id};
	res.send(database.genericRead("elephant_user", req.body));
};


/* Update */
exports.update = function(req, res) {
	if (req.params.id) {
		req.body['id'] = req.params.id;
	}

	res.json(database.genericUpdate("elephant_user", req.body));
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	if (!req.params.id) {
		res.json("no id provided - no delete");
		return;
	}

	res.json(database.genericDelete("elephant_user", req.body));
};


/* Delete by key/value */
exports.delete = function(req, res) {
	res.json(database.genericDelete("elephant_user", req.body));
};
