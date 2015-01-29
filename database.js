var pg = require('pg');


var userReset = "DROP SEQUENCE user_seq CASCADE; CREATE SEQUENCE user_seq; DROP TABLE elephant_user; CREATE TABLE elephant_user(id INT NOT NULL PRIMARY KEY DEFAULT nextval('user_seq'::regclass), username VARCHAR(80) NOT NULL UNIQUE, password VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL UNIQUE, role VARCHAR(10) NOT NULL DEFAULT 'user', facebook_id VARCHAR(80), fencepost_hour_of_day INT, fencepost_day_of_week INT, fencepost_day_of_month INT, fencepost_month_of_year INT, is_fencepost_link BOOLEAN DEFAULT TRUE); ";

var journalReset = "DROP SEQUENCE journal_seq CASCADE; CREATE SEQUENCE journal_seq; DROP TABLE journal; CREATE TABLE journal(id INT NOT NULL PRIMARY KEY DEFAULT nextval('journal_seq'::regclass), created TIMESTAMP DEFAULT NOW(), title VARCHAR(80) NOT NULL, description TEXT NOT NULL, is_private BOOLEAN DEFAULT TRUE, user_id INT NOT NULL); ";

var taskReset = "DROP SEQUENCE task_seq CASCADE; CREATE SEQUENCE task_seq; DROP TABLE task; CREATE TABLE task(id INT NOT NULL PRIMARY KEY DEFAULT nextval('task_seq'::regclass), name VARCHAR(80) NOT NULL, description TEXT NOT NULL, due_date TIMESTAMP, done_date TIMESTAMP, parent_task_id INT, user_id INT NOT NULL, priority INT DEFAULT 0); ";

var durationReset = "DROP SEQUENCE duration_seq CASCADE; CREATE SEQUENCE duration_seq; DROP TABLE duration; CREATE TABLE duration(id INT NOT NULL PRIMARY KEY DEFAULT nextval('duration_seq'::regclass), name VARCHAR(80) NOT NULL UNIQUE, factor INT NOT NULL UNIQUE); ";

var metricReset = "DROP SEQUENCE metric_seq CASCADE; CREATE SEQUENCE metric_seq; DROP TABLE metric; CREATE TABLE metric(id INT NOT NULL PRIMARY KEY DEFAULT nextval('metric_seq'::regclass), name VARCHAR(80) NOT NULL UNIQUE, is_private BOOLEAN DEFAULT TRUE, user_id INT); ";

var unitReset = "DROP SEQUENCE unit_seq CASCADE; CREATE SEQUENCE unit_seq; DROP TABLE unit; CREATE TABLE unit(id INT NOT NULL PRIMARY KEY DEFAULT nextval('unit_seq'::regclass), name VARCHAR(80) NOT NULL, factor INT NOT NULL UNIQUE, is_private BOOLEAN DEFAULT TRUE, metric_id INT NOT NULL);";

exports.reset = function(req, res) {
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(userReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(journalReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(taskReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(durationReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(metricReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});

	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(unitReset, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});
	res.send("tables created");
};

exports.populate = function(req, res) {
	var addUser = "INSERT INTO elephant_user (username, password, email, role, facebook_id) VALUES ('lehmann314159', 'drowssap', 'lehmann314159@gmail.com', 'user', 314159);"
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(addUser, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	});
};
