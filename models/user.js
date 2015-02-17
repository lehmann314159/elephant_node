var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	database.genericCreate("elephant_user", req.body, res);
};


/* Read All */
exports.find = function(req, res) {
	database.genericRead("elephant_user", req.body, res);
};


/* Read by ID */
exports.findById = function(req, res) {
	req.body = { "id": req.params.id};
	database.genericRead("elephant_user", req.body, res);
};


/* Update */
exports.update = function(req, res) {
	if (req.params.id) {
		req.body['id'] = req.params.id;
	}

	database.genericUpdate("elephant_user", req.body, res);
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	if (!req.params.id) {
		res.json("no id provided - no delete");
		return;
	}

	database.genericDelete("elephant_user", req.body);
};


/* Delete by key/value */
exports.delete = function(req, res) {
	database.genericDelete("elephant_user", req.body, res);
};
