var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericCreate("journal", req.body, res);
};


/* Read by ID */
exports.findById = function(req, res) {
	database.genericRead("journal", {
		"id": req.params.jid,
		"user_id": req.params.uid
		}, res);
};


/* Read */
exports.find = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericRead("journal", req.body, res);
};


/* Update By Id */
exports.updateById = function(req, res) {
	console.log('in updateById');
	req.body['user_id'] = req.params.uid;
	req.body['id'] = req.params.jid;
	database.genericUpdate("journal", req.body, res);
};


/* Update */
exports.update = function(req, res) {
	console.log('in update');
	req.body['user_id'] = req.params.uid;
	database.genericUpdate("journal", req.body, res);
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	req.body['user_id'] = req.params.uid;
	req.body['id'] = req.params.jid;
	database.genericDelete("journal", req.body, res);
};


/* Delete by key/value */
exports.delete = function(req, res) {
	req.body['user_id'] = req.params.uid;
	database.genericDelete("journal", req.body, res);
};
