var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericCreate("task", req.body, res);
};


/* Read by ID */
exports.findById = function(req, res) {
	database.genericRead("task", {
		"id": req.params.tid,
		"user_id": req.params.uid
		}, res);
};


/* Read */
exports.find = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericRead("task", req.body, res);
};


/* Update By Id */
exports.updateById = function(req, res) {
	req.body['user_id'] = req.params.uid;
	req.body['id'] = req.params.tid;
	database.genericUpdate("task", req.body, res);
};


/* Update */
exports.update = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericUpdate("task", req.body, res);
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	req.body['user_id'] = req.params.uid;
	req.body['id'] = req.params.tid;
	database.genericDelete("task", req.body, res);
};


/* Delete by key/value */
exports.delete = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericDelete("task", req.body, res);
};
