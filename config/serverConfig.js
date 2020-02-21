// Express
var express = require('express');
var app = express();

// EJS - Dynamic Content in pages
app.set('view engine', 'ejs');
app.set('views', './views'); // You must put the views in ./views directory

// Body-Parser - Parse Form Data Send To Server
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect-MultiParty - Receive Files From Client
var multiparty = require('connect-multiparty');

// Consign - Easy Module Imports
var consign = require('consign');
consign().
	include('./someDir')
	.into(app);

module.exports = app;