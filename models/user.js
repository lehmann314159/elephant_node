var database = require("../database");

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

/* Create */
exports.add = function(req, res) {
	database.genericCreate("elephant_user", req.body, res);
};


/* Read by ID */
exports.findById = function(req, res) {
	database.genericRead("elephant_user", {"id": req.params.id}, req.body, res);
};


/* Read */
exports.find = function(req, res) {
	database.genericRead("elephant_user", req.body, res);
};


/* Update By Id */
exports.updateById = function(req, res) {
	req.body['id'] = req.params.id;
	database.genericUpdate("elephant_user", req.body, res);
};


/* Update */
exports.update = function(req, res) {
	database.genericUpdate("elephant_user", req.body, res);
};


/* Delete  by ID */
exports.deleteById = function(req, res) {
	req.body['id'] = req.params.id;
	database.genericDelete("elephant_user", req.body, res);
};


/* Delete by key/value */
exports.delete = function(req, res) {
	database.genericDelete("elephant_user", req.body, res);
};
