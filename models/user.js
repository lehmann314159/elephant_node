var pg = require('pg');

var execute = function(query) {
	pg.connect(process.env.HEROKU_POSTGRESQL_DBNAME_URL, function(err, client, done) {
		client.query(query, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log(result.rows);
		});
	})
};

exports.findAll = function(req, res) {
	myQuery = 'SELECT * FROM user';
	res.send(execute(myQuery));
};
