const fs = require('fs');
const DatabaseHelper = require('../../helpers/databaseHelper');

function telegramBotHelper(app){
	this.getChatIds = () => {
		try{
			const getChatIdsSql = "" +
					"SELECT chatId " +
					"FROM telegramBotUsers ";

			const databaseHelper = new DatabaseHelper();
			console.log(databaseHelper.simpleDatabaseQuery(getChatIdsSql));
		}
		catch(error){
			console.log(error);
		}
	}
}

module.exports = () => {
	return telegramBotHelper;
}