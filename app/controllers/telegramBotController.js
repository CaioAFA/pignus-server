// Bot name: @BillDaSilvaBot
import TelegramBotHelper from '../helpers/telegramBotHelper';
import TelegramBot from 'node-telegram-bot-api';
const token = '1114270428:AAGzKFP-JtQZ1d3X27Cn9iWXcHGBwxasImI';
const bot = new TelegramBot(token, {polling: true});

// Send Message to all users in "chatId" file
async function sendMessageToAllUsers(app, message){
	const telegramBotModel = new app.app.models.telegramBotModel(app);
	const telegramBotUsers = await telegramBotModel.getTelegramUsers(app);

	telegramBotUsers.forEach(async (user) => {
		bot.sendMessage(user.chatId, message);
	});
}

// Send Photo to all users in "chatId" file
async function sendPhotoToAllUsers(app, photoPath){
	const telegramBotModel = new app.app.models.telegramBotModel(app);
	const telegramBotUsers = await telegramBotModel.getTelegramUsers(app);

	telegramBotUsers.forEach((user) => {
		bot.sendPhoto(user.chatId, photoPath);
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
export function sendAdvice(app, photoPath){
	var messageToClient = '\u26A0 Alerta de segurança!\n\n';

	var dt = new Date();
	messageToClient += 'Incidente ocorrido em ' +
						dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear() +
						' às ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '\n\n';

	sendMessageToAllUsers(app, messageToClient);
	sendPhotoToAllUsers(app, photoPath);
}

export async function registerTelegramUser(app, req, res){
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

export async function getTelegramUsers(app, req, res){
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

export async function deleteTelegramUser(app, req, res){
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

export async function renderTelegramIntegrationPage(app, req, res){
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

export async function sendTestMessage(app, req, res){
	const testMessage = `Suas configurações estão OK.\nTeste realizado em:\n${new Date().toLocaleString()}`;
	try{
		sendMessageToAllUsers(app, testMessage);
		res.status(200).send('Ok');
	}
	catch(error){
		res.status(500).send(error);
	}
}