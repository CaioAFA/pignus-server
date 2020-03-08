const fs  = require('fs');
const app = require('./config/serverConfig');

// Get Port Passed By CLI. Default: 3000.
const myArgs = process.argv.slice(2);
var PORT;
if(myArgs.length == 0){
	console.log('No Port Informed. Default Port: 3000.')
	PORT = 3000;
}
else{
	PORT = parseInt(myArgs[0]);
}

// Verify if the necessary folders exists
// If don't, we'll create then.
if(! fs.existsSync('./app/public/photos')){
	fs.mkdirSync('./app/public/photos', {recursive: true});
}

app.app.bots.telegramBot.telegramBotController.sendAdvice('./app/public/photos/shrek.jpeg');

app.listen(PORT, () => {
	console.log(`Server ON on Port ${PORT}!`);
});