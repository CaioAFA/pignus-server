// Bot name: @BillDaSilvaBot
const TelegramBotHelper = require('../helpers/telegramBotHelper');
const TelegramBot = require('node-telegram-bot-api');
const token = '1114270428:AAGzKFP-JtQZ1d3X27Cn9iWXcHGBwxasImI';
const bot = new TelegramBot(token, {polling: true});

// Send Message to all users in "chatId" file
async function sendMessageToUsers(app, message){
	const telegramBotHelper = new TelegramBotHelper(app)
	const users = await telegramBotHelper.getChatIds();

	users.forEach((user) => {
		try{
			bot.sendMessage(user.chatId, message);
		}
		catch(error){
			console.log(error);
		}
	});
}

// Send Photo to all users in "chatId" file
async function sendPhotoToUsers(app, photoPath){
	const telegramBotHelper = new TelegramBotHelper(app)
	const users = await telegramBotHelper.getChatIds();

	users.forEach((user) => {
		try{
			bot.sendPhoto(user.chatId, photoPath);
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

		default:
			message = 'Insira um comando válido.';
			break;
	}

	bot.sendMessage(clientChatId, message);
});

// ************************************ Messages to the "chatId" user ************************************

// Send advices to the user
module.exports.sendAdvice = function(app, photoPath){
	var messageToClient = '\u26A0 Alerta de segurança!\n\n';

	var dt = new Date();
	messageToClient += 'Incidente ocorrido em ' +
						dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear() +
						' às ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '\n\n';

	sendMessageToUsers(app, messageToClient);
	sendPhotoToUsers(app, photoPath);
}

module.exports.registerTelegramUser = async function(app, req, res){
	const telegramBotModel = new app.app.models.telegramBotModel(app);
	try{
		await telegramBotModel.registerTelegramUserInDatabase(req);
		res.status(200).send('Ok');
	}
	catch(error){
		console.log(error);
		res.status(500).send(error);
	}
}

module.exports.getTelegramUsers = async function(app, req, res){
	const telegramBotModel = new app.app.models.telegramBotModel(app);

	try{
		const telegramBotUsers = await telegramBotModel.getTelegramUsers();
		res.status(200).send(telegramBotUsers);
	}
	catch(error){
		console.log(error);
		res.status(500).send(error);
	}
}

module.exports.deleteTelegramUser = async function(app, req, res){
	const userId = req.params.userId;

	const telegramBotModel = new app.app.models.telegramBotModel(app);
	try{
		telegramBotModel.deleteTelegramUser(userId);
		res.status(200).send('Ok');
	}
	catch(error){
		console.log(error);
		res.status(500).send(error);
	}
}

module.exports.renderTelegramIntegrationPage = async function(app, req, res){
	const telegramBotModel = new app.app.models.telegramBotModel(app);

	try{
		const telegramBotUsers = await telegramBotModel.getTelegramUsers(app);
		res.render('telegramConfig/telegramConfig', {telegramBotUsers: telegramBotUsers});
	}
	catch(error){
		console.log(error);
		res.status(500).send(error);
	}

}