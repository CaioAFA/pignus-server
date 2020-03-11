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

app.listen(PORT, () => {
	console.log(`Server ON on Port ${PORT}!`);
});