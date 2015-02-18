var pg = require('pg');

// Workhorse query function
exports.query = function(inQuery, res) {
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(inQuery, function(err, result) {
			done();
			if(err) {
				res.json(err);
			} else {
				console.log(result.rows);
				res.json(result.rows);
			}
		});
	});
};


/*
 * SQL component functions
 */

// assembles a where clause
exports.whereClause = function(body, includeId) {
	if (!body) { return ""; }

	var whereString = " WHERE ";
	for (var key in body) {
		if (body.hasOwnProperty(key)) {
			if  (
				(key != 'id' || includeId) 
				&& (key.substring(0, 4) != "new_")
			) {
				if (whereString == " WHERE ") {
					whereString += key + " = '" + body[key]  + "' ";
				} else {
					whereString += "AND " + key + " = '" + body[key]  + "' ";
				}
			}
		}
	}
	return (whereString != " WHERE ") ? whereString : "";
};

// assembles an insert VALUES clause
exports.valuesClause = function(body) {
	if (!body) { return ""; }
	var keys = [];
	var values = [];
	for (var key in body) {
		if (body.hasOwnProperty(key)) {
			keys.push(key);
			values.push("'" + body[key] + "'");
		}
	}
	return " (" + keys.toString() + ") VALUES (" + values.toString() + ") ";
};

// assembles a SET clause
exports.setClause = function(body) {
	if (!body) { return ""; }
	var setString = " SET ";
	for (var key in body) {
		if (body.hasOwnProperty(key)) {
			if (key.substring(0, 4) == "new_") {
				if (setString == " SET ") {
					setString += key.substring(4) + " = '" + body[key]  + "' ";
				} else {
					setString += ", " + key.substring(4) + " = '" + body[key]  + "' ";
				}
			}
		}
	}
	return (setString != " SET ") ? setString : "";
};

exports.populate = function(req, res) {
	var myQuery = "INSERT INTO elephant_user (username, password, email) VALUES ('lehmann314159', 'password', 'lehmann314159@gmail.com');";
	ret = exports.query(myQuery);
	res.send("row inserted");
};

// Frankenstein
exports.assemble = function(bag) {
	var q = "";
	if (typeof bag != "object") { return ""; }
	if (!bag.hasOwnProperty('domain')) { return ""; }

	switch (bag['action'].toLowerCase()) {
	case 'insert':
		if (!bag.hasOwnProperty('parameters')) { return ""; }
		 q = "INSERT INTO " + bag['domain'] + exports.valuesClause(bag['parameters']) + " RETURNING id";
		break;

	case 'select':
		// I'm tired, so I'm handling interesting field selection later
		q = "SELECT * FROM " + bag['domain']
			+ exports.whereClause(bag['parameters'], true);
		break;

	case 'update':
		q = "UPDATE " + bag['domain'] + exports.setClause(bag['parameters'], true)
			+ exports.whereClause(bag['parameters']);
		break;

	case 'delete':
		q = "DELETE FROM " + bag['domain'] + exports.whereClause(bag['parameters'], true);
		break;
	}

	console.log('assembled query: ' + q);
	return q;
};

// Creates sequences and schemas
// I wrote separate functions because I couldn't get sequences to drop
// conditionally, so dropping tables conditionally wasn't transactional
exports.create = function(req, res) {
	var userCreate =
		"CREATE SEQUENCE user_seq; "
		+ "CREATE TABLE elephant_user("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('user_seq'::regclass)"
		+ ", username VARCHAR(80) NOT NULL UNIQUE"
		+ ", password VARCHAR(80) NOT NULL"
		+ ", email VARCHAR(80) NOT NULL UNIQUE"
		+ ", role VARCHAR(10) NOT NULL DEFAULT 'user'"
		+ ", facebook_id VARCHAR(80)"
		+ ", fencepost_hour_of_day INT"
		+ ", fencepost_day_of_week INT"
		+ ", fencepost_day_of_month INT"
		+ ", fencepost_month_of_year INT"
		+ ", is_fencepost_link BOOLEAN DEFAULT TRUE"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(userCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var journalCreate =
		"CREATE SEQUENCE journal_seq; "
		+ "CREATE TABLE journal("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('journal_seq'::regclass)"
		+ ", created TIMESTAMP DEFAULT NOW()"
		+ ", title VARCHAR(80) NOT NULL"
		+ ", description TEXT NOT NULL"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", user_id INT NOT NULL"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(journalCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var taskCreate =
		"CREATE SEQUENCE task_seq; "
		+ "CREATE TABLE task("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('task_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL"
		+ ", description TEXT NOT NULL"
		+ ", due_date TIMESTAMP"
		+ ", done_date TIMESTAMP"
		+ ", parent_task_id INT"
		+ ", user_id INT NOT NULL"
		+ ", priority INT DEFAULT 0"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(taskCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var durationCreate =
		"CREATE SEQUENCE duration_seq; "
		+ "CREATE TABLE duration("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('duration_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL UNIQUE"
		+ ", factor INT NOT NULL UNIQUE"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(durationCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var metricCreate = 
		"CREATE SEQUENCE metric_seq; "
		+ "CREATE TABLE metric("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('metric_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL UNIQUE"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", user_id INT"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(metricCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var unitCreate =
		"CREATE SEQUENCE unit_seq; "
		+ "CREATE TABLE unit("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('unit_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL"
		+ ", factor INT NOT NULL UNIQUE"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", metric_id INT NOT NULL"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(unitCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});


	var activityTypeCreate =
		"CREATE SEQUENCE activity_type_seq; "
		+ "CREATE TABLE activity_type("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('activity_type_seq'::regClass)"
		+ ", title VARCHAR(80) NOT NULL UNIQUE"
		+ ", notes TEXT"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", user_id INT"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(activityTypeCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	var activityCreate =
		"CREATE SEQUENCE activity_seq; "
		+ "CREATE TABLE activity("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('activity_seq'::regclass)"
		+ ", notes TEXT"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", activity_id INT NOT NULL"
		+ ", user_id INT NOT NULL"
	+ ");"

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(activityCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	var interestTemplateCreate =
		"CREATE SEQUENCE interest_template_seq; "
		+ "CREATE TABLE interest_template("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('interest_template_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL UNIQUE"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(interestTemplateCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	var interestCreate =
		"CREATE SEQUENCE interest_seq; "
		+ "CREATE TABLE interest("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('interest_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(interestCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	var goalOperatorCreate =
		"CREATE SEQUENCE goal_operator_seq; "
		+ "CREATE TABLE goal_operator("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('goal_operator_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL"
		+ ", aggregator VARCHAR(10) NOT NULL"
		+ ", function VARCHAR(255) NOT NULL"
		+ ", user_id INT"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(goalOperatorCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	var goalCreate =
		"CREATE SEQUENCE goal_seq; "
		+ "CREATE TABLE goal("
		+ "id INT NOT NULL PRIMARY KEY DEFAULT nextval('goal_seq'::regclass)"
		+ ", title VARCHAR(80) NOT NULL"
		+ ", activity_type_id INT NOT NULL"
		+ ", operand_one NUMERIC NOT NULL"
		+ ", operand_two NUMERIC"
		+ ", unit_id INT NOT NULL"
		+ ", goal_operator_id INT NOT NULL"
		+ ", duration_id INT NOT NULL"
		+ ", duration_count INT NOT NULL"
		+ ", is_private BOOLEAN DEFAULT TRUE"
		+ ", user_id INT NOT NULL"
	+ ");";

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(goalCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	res.send("tables created");
};

// drops sequences and schemas
// I wrote separate functions because I couldn't get sequences to drop
// conditionally, so dropping tables conditionally wasn't transactional
exports.drop = function(req, res) {
	var drop = "DROP SEQUENCE user_seq CASCADE;              DROP TABLE elephant_user;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE journal_seq CASCADE;           DROP TABLE journal;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE task_seq CASCADE;              DROP TABLE task;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE duration_seq CASCADE;          DROP TABLE duration;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE metric_seq CASCADE;            DROP TABLE metric;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE unit_seq CASCADE;              DROP TABLE unit;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE activity_type_seq CASCADE;     DROP TABLE activity_type;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE activity_seq CASCADE;          DROP TABLE activity;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE interest_template_seq CASCADE; DROP TABLE interest_template;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE interest_seq CASCADE;          DROP TABLE interest;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE goal_operator_seq CASCADE;     DROP TABLE goal_operator;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	drop = "DROP SEQUENCE goal_seq CASCADE;              DROP TABLE goal;";
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(drop, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	res.send('sequences and tables dropped...');
};

/////////////////////
/* CRUD OPERATIONS */
/////////////////////

// Create
exports.genericCreate = function(domain, body, res) {
	exports.query(
		exports.assemble({
			"action": "insert",
			"domain": domain,
			"parameters": body
	}), res);
};

// Read
exports.genericRead = function(domain, body, res) {
	exports.query(
		exports.assemble({
			"action": "select",
			"domain": domain,
			"parameters": body
	}), res);
};

// Update
exports.genericUpdate = function(domain, body, res) {
	return exports.query(
		exports.assemble({
			"action": "update",
			"domain": domain,
			"parameters": body
	}), res);
};

// Delete by key/value
exports.genericDelete = function(domain, body, res) {
	return exports.query(
		exports.assemble({
			"action": "delete",
			"domain": domain,
			"parameters": body
	}), res);
};
