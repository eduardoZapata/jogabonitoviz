var express = require("express");
var logfmt = require("logfmt");
var app = express();

var monk = require('monk');
//var db = require('monk')('mongodb://joga:United99@dbh55.mongolab.com:27557/heroku_app25040865');
var db = require('monk')('localhost/jogaB');

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/public'));

require('./stats/league/points.js')(app,db);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

