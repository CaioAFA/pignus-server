// Bot name: @BillDaSilvaBot

const TelegramBot = require('node-telegram-bot-api');
const token = '1114270428:AAGzKFP-JtQZ1d3X27Cn9iWXcHGBwxasImI';
const bot = new TelegramBot(token, {polling: true});

// Read the "chatId" file in this directory to send messages to user
const chatId = '990434657';

// Log the error when it occurs
bot.on('polling_error', (err) => console.log(err));

bot.on('message', (msg) => {
	const clientChatId = msg.chat.id;

	var message = '';
	switch(msg.text){
		case '/meuId':
			message = `Seu id é: ${clientChatId}`;
			break;

		default:
			message = 'Insira um comando válido.';
			break;
	}

	bot.sendMessage(clientChatId, message);
});

// Send advices to the user
module.exports.sendAdvice = function(photoPath){
	var messageToClient = '\u26A0 Alerta de segurança!\n\n';

	var dt = new Date();
	messageToClient += 'Incidente ocorrido em ' +
						dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear() +
						' às ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '\n\n';

	bot.sendMessage(chatId, messageToClient);
	bot.sendPhoto(chatId, photoPath);
}
