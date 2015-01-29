var pg = require('pg');


var userCreate = "CREATE SEQUENCE user_seq; CREATE TABLE elephant_user(id INT NOT NULL PRIMARY KEY DEFAULT nextval('user_seq'::regclass), username VARCHAR(80) NOT NULL UNIQUE, password VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL UNIQUE, role VARCHAR(10) NOT NULL DEFAULT 'user', facebook_id VARCHAR(80), fencepost_hour_of_day INT, fencepost_day_of_week INT, fencepost_day_of_month INT, fencepost_month_of_year INT, is_fencepost_link BOOLEAN DEFAULT TRUE); ";

var journalCreate = "CREATE SEQUENCE journal_seq; CREATE TABLE journal(id INT NOT NULL PRIMARY KEY DEFAULT nextval('journal_seq'::regclass), created TIMESTAMP DEFAULT NOW(), title VARCHAR(80) NOT NULL, description TEXT NOT NULL, is_private BOOLEAN DEFAULT TRUE, user_id INT NOT NULL); ";

var taskCreate = "CREATE SEQUENCE task_seq; CREATE TABLE task(id INT NOT NULL PRIMARY KEY DEFAULT nextval('task_seq'::regclass), name VARCHAR(80) NOT NULL, description TEXT NOT NULL, due_date TIMESTAMP, done_date TIMESTAMP, parent_task_id INT, user_id INT NOT NULL, priority INT DEFAULT 0); ";

var durationCreate = "CREATE SEQUENCE duration_seq; CREATE TABLE duration(id INT NOT NULL PRIMARY KEY DEFAULT nextval('duration_seq'::regclass), name VARCHAR(80) NOT NULL UNIQUE, factor INT NOT NULL UNIQUE); ";

var metricCreate = "CREATE SEQUENCE metric_seq; CREATE TABLE metric(id INT NOT NULL PRIMARY KEY DEFAULT nextval('metric_seq'::regclass), name VARCHAR(80) NOT NULL UNIQUE, is_private BOOLEAN DEFAULT TRUE, user_id INT); ";

var unitCreate = "CREATE SEQUENCE unit_seq; CREATE TABLE unit(id INT NOT NULL PRIMARY KEY DEFAULT nextval('unit_seq'::regclass), name VARCHAR(80) NOT NULL, factor INT NOT NULL UNIQUE, is_private BOOLEAN DEFAULT TRUE, metric_id INT NOT NULL);";

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
};
