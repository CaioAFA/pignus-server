const fs = require('fs');

module.exports.getChatId = function(){
	const chatId = fs.readFileSync('./app/bots/telegramBot/chatId', 'utf8');
	return chatId;
}