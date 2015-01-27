var pg = require('pg');

var userCreate = "
CREATE TABLE elephant_user IF NOT EXISTS
( id                      INT NOT NULL PRIMARY KEY AUTO_INCREMENT
, username                VARCHAR(80) NOT NULL UNIQUE
, password                VARCHAR(80) NOT NULL
, email                   VARCHAR(80) NOT NULL UNIQUE
, role                    VARCHAR(10) NOT NULL DEFAULT 'user'
, facebook_id             VARCHAR(80)
, fencepost_hour_of_day   INT
, fencepost_day_of_week   INT
, fencepost_day_of_month  INT
, fencepost_month_of_year INT
, is_fencepost_link       TINYINT(1) DEFAULT 1
);
";

var journalCreate = "
-- journal - personal
-- The user describes events qualitatively.
-- connects: m2m activity, m2m goal, m2m interest, m2m task, m2o user
CREATE TABLE journal IF NOT EXISTS
( id
, timestamp   TIMESTAMP DEFAULT NOW()
, title       VARCHAR(80) NOT NULL
, description TEXT NOT NULL
, is_private  TINYINT(1) DEFAULT 1
, user_id     INT NOT NULL
);
";

var taskCreate = "
-- task - personal
-- The user performs it once.  Supports trees.
-- connects: o2m activity, m2m interest
CREATE TABLE task IF NOT EXISTS
( id             INT NOT NULL PRIMARY KEY AUTO_INCREMENT
, name           VARCHAR(80) NOT NULL
, description    TEXT NOT NULL
, due_date       TIMESTAMP
, done_date      TIMESTAMP
, parent_task_id INT
, user_id        INT NOT NULL
, priority       INT DEFAULT 0
);
";

var durationCreate = "
-- duration - global
-- These are time periods for collecting activities and events.
-- connects: o2m goal (fencepost), m2m user (fencepost)
-- This table is small, so we will denormalize connections
CREATE TABLE duration IF NOT EXISTS
( id     INT NOT NULL PRIMARY KEY AUTO_INCREMENT
, name   VARCHAR(80) NOT NULL UNIQUE
, factor INT NOT NULL UNIQUE
);
";

var metricCreate = "
-- metric global or personal
-- These are things that can be measured, like time or distance
-- We store the units separately
-- connects: m2m activity_type, o2m unit
CREATE TABLE metric IF NOT EXISTS
( id         INT NOT NULL PRIMARY KEY AUTO_INCREMENT
, name       VARCHAR(80) NOT NULL UNIQUE
, is_private TINYINT(1) DEFAULT 1
, user_id    INT
);
";

var unitCreate = "
-- unit - global or personal
-- These are how we measure metrics.  Distance has foot, yard, mile
-- connects: m2m activity, m2o metric
CREATE TABLE unit IF NOT EXISTS
( id
, name
, factor
, metric_id
);
";

exports.createTables = function(req, res) {
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(userCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(journalCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(taskCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(durationCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(metricCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(unitCreate, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});
	res.send("tables created");
