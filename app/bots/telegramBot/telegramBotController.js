// Bot name: @BillDaSilvaBot
const helper = require('./helper');
const TelegramBot = require('node-telegram-bot-api');
const token = '1114270428:AAGzKFP-JtQZ1d3X27Cn9iWXcHGBwxasImI';
const bot = new TelegramBot(token, {polling: true});

// Read the "chatId" file in this directory to send messages to users
const chatIds = helper.getChatIds();
console.log(chatIds);

// Send Message to all users in "chatId" file
function sendMessageToUsers(message){
	chatIds.forEach((userId) => {
		try{
			bot.sendMessage(userId, message);
		}
		catch(error){
			console.log(error);
		}
	});
}

// Send Photo to all users in "chatId" file
function sendPhotoToUsers(photoPath){
	chatIds.forEach((userId) => {
		try{
			bot.sendPhoto(userId, photoPath);
		}
		catch(error){
			console.log(error);
		}
	});
}

// Log the error when it occurs
bot.on('polling_error', (err) => console.log(err));

// ************************************ Messages to any users ************************************
bot.on('message', (msg) => {
	const clientChatId = msg.chat.id;

	var message = '';
	switch(msg.text){
		case '/meuId':
			message = `Seu id é: ${clientChatId}`;
			break;

		case '/shrek':
			message = 'urro';
			photoPath = 'C:/Users/FCI-LCV/Desktop/CaioLeandro/shrek.jpg';
			sendMessageToUsers(message);
			sendPhotoToUsers(photoPath);
			return;

		default:
			message = 'Insira um comando válido.';
			break;
	}

	bot.sendMessage(clientChatId, message);
});

// ************************************ Messages to the "chatId" user ************************************

// Send advices to the user
module.exports.sendAdvice = function(photoPath){
	var messageToClient = '\u26A0 Alerta de segurança!\n\n';

	var dt = new Date();
	messageToClient += 'Incidente ocorrido em ' +
						dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear() +
						' às ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '\n\n';

	sendMessageToUsers(messageToClient);
	sendPhotoToUsers(photoPath);
}
