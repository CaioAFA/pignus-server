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
app.use(multiparty());

// Consign - Easy Module Imports
var consign = require('consign');
consign().
	include('./app/routes')
	.then('./app/controllers')
	.then('./app/models')
	.then('./app/bots/telegramBot/telegramBotController.js')
	.then('./app/bots/telegramBot/helper.js')
	.into(app);

const fs  = require('fs');

// Verify if the necessary folders exists
// If don't, we'll create then.
if(! fs.existsSync('./app/public/photos')){
	fs.mkdirSync('./app/public/photos', {recursive: true});
}

module.exports = app;