var express = require('express');
var app = express();
var server = app.listen(8080,"0.0.0.0");



app.use(express.static('.'));

console.log("Server is running...");
//dsf