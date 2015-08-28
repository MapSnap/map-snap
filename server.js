var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('client'));

app.listen(process.env.PORT || 3000, function(err){
	if(err) throw err;
});

module.exports = app;
