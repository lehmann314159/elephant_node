var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	console.log(req.params.uid);
	//database.genericCreate("journal", req.body, res);
};


/* Read All */
exports.find = function(req, res) {
	console.log(req.params.uid);
	//database.genericRead("journal", req.body, res);
};


/* Read by ID */
exports.findById = function(req, res) {
	console.log(req.params.uid);
	req.body = { "id": req.params.id};
	//database.genericRead("journal", req.body, res);
};


/* Update */
exports.update = function(req, res) {
	if (req.params.id) {
		req.body['id'] = req.params.id;
	}

	//database.genericUpdate("journal", req.body, res);
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	if (!req.params.id) {
		res.json("no id provided - no delete");
		return;
	}

	//database.genericDelete("journal", req.body, res);
};


/* Delete by key/value */
exports.delete = function(req, res) {
	//database.genericDelete("journal", req.body, res);
};
