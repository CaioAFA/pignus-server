const fs = require('fs');

module.exports.getChatIds = function(){
	try{
		const chatIdFileContent = fs.readFileSync('./app/bots/telegramBot/chatIds', 'utf8');

		// Split different chat id's by lines and remove the '/r'
		let chatIds = chatIdFileContent.split('\n');

		// Remove the '\r' char
		for(var i = 0; i < chatIds.length; i++){
			chatIds[i] = chatIds[i].replace('\r', '');
		}

		// Remove the empty lines
		chatIds = chatIds.filter((lineContent) => {
			return lineContent.length != 0;
		});

		// Remove lines who begin with '#'
		chatIds = chatIds.filter((lineContent) => {
			return lineContent.trim()[0] != '#';
		});

		return chatIds;
	}
	catch(error){	// If the archive can't be read, we'll return an empty array
		console.log('Nao foi possivel ler o arquivo chatIds.');
		return [];
	}
}
