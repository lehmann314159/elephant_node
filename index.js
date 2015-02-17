// includes
var express  = require('express')            // express server module
,   bodyParser = require('body-parser')      // body parser middle-ware
,   database = require('./database')
,   user = require('./models/user')          // model
,   journal = require('./models/journal')    // model
//,   metric = require('./models/metric')      // model
//,   unit = require('./models/unit')          // model
//,   duration = require('./models/duration')  // model
//,   task = require('./models/task')          // model
;

// housekeeping
var app = express();
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// routes
// test
app.get('/', function(request, response) {
	response.send("This is a test server");
});

// db demo operations
app.get('/create',   database.create);
app.get('/drop',     database.drop);
app.get('/populate', database.populate);


// user routes
app.post('/user',       user.add);

app.get('/user',        user.find);
app.get('/user/:id',    user.findById);

app.put('/user',        user.update);
app.put('/user/:id',    user.update);

app.delete('/user/',    user.delete);
app.delete('/user/:id', user.deleteById);


// journal routes
app.post('/journal',       journal.add);

app.get('/journal',        journal.find);
app.get('/journal/:id',    journal.findById);

app.put('/journal',        journal.update);
app.put('/journal/:id',    journal.update);

app.delete('/journal/',    journal.delete);
app.delete('/journal/:id', journal.deleteById);
