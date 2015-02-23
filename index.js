// includes
var express    = require('express')        // express server module
,   bodyParser = require('body-parser')    // body parser middle-ware
,   database   = require('./database')     // base db functionality
,   meta       = require('./metadatabase') // useful functions

,   user    = require('./models/user')       // model
,   journal = require('./models/journal')    // model
,   metric = require('./models/metric')      // model
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
app.get('/clear',    meta.clear);
app.get('/populate', database.populate);


// user routes
app.post('/user',       user.add);
app.get('/user/:id',    user.findById);
app.get('/user',        user.find);
app.put('/user/:id',    user.updateById);
app.put('/user',        user.update);
app.delete('/user/:id', user.deleteById);
app.delete('/user/',    user.delete);


// journal routes
app.post('/user/:uid/journal',        journal.add);
app.get('/user/:uid/journal/:jid',    journal.findById);
app.get('/user/:uid/journal',         journal.find);
app.put('/user/:uid/journal/:jid',    journal.updateById);
app.put('/user/:uid/journal',         journal.update);
app.delete('/user/:uid/journal/:jid', journal.deleteById);
app.delete('/user/:uid/journal/',     journal.delete);


// metric routes - uid 0 is admin
app.post('/user/:uid/metric',        metric.add);
app.get('/user/:uid/metric/:jid',    metric.findById);
app.get('/user/:uid/metric',         metric.find);
app.put('/user/:uid/metric/:jid',    metric.updateById);
app.put('/user/:uid/metric',         metric.update);
app.delete('/user/:uid/metric/:jid', metric.deleteById);
app.delete('/user/:uid/metric/',     metric.delete);
