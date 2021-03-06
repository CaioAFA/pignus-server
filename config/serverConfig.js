// Express
var express = require('express');
var app = express();

// EJS - Dynamic Content in pages
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Static content
app.use(express.static('./app/public'));

// Body-Parser - Parse Form Data Send To Server
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Express Session - Save data from user session
var expressSession = require('express-session');
app.use(expressSession({
	secret: 'odifisdofiasdbfierwhiofo129rhibwejiaf',
	resave: false,
	saveUninitialized: false
}));

// Connect-MultiParty - Receive Files From Client
var multiparty = require('connect-multiparty');
app.use(multiparty());

// If the user is not logged, redirect to /login
const loginRedirectMiddleware = require('./middlewares/loginRedirect')(app);

// Consign - Easy Module Imports
var consign = require('consign');
consign().
	include('./app/routes')
	.then('./config/dbConfig.js')
	.then('./config/aiServerUrl.js')
	.then('./app/controllers')
	.then('./app/models')
	.then('./app/helpers')
	.into(app);

// Allow access to API
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

const fs  = require('fs');
// Verify if the necessary folders exists
// If don't, we'll create then.
if(! fs.existsSync('./app/public/photos')){
	fs.mkdirSync('./app/public/photos', {recursive: true});
}

//Verify if the database config exists
if(! fs.existsSync('./config/dbConfig.js')){
	console.log('ERRO: Arquivo de configurações do banco de dados não encontrado (./config/dbConfig.js).');
	process.exit(1);
}

//Verify if the AI server URL file exists
if(! fs.existsSync('./config/aiServerUrl.js')){
	console.log('ERRO: Arquivo de configurações do banco de dados não encontrado (./config/aiServerUrl.js).');
	process.exit(1);
}

module.exports = app;