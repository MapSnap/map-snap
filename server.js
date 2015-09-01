var express = require('express');
var app = express();

app.use(express.static('client'));

app.listen(4000, function(err){
	if(err) throw err;
	// console.log("Liste÷ning on port 3000");
});

module.exports = app;
