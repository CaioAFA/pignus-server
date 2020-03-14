function telegramBotHelper(app){
	this.app = app;

	this.getChatIds = async() => {
		try{
			const getChatIdsSql = "" +
					"SELECT chatId " +
					"FROM telegramBotUser";

			const databaseHelper = new DatabaseHelper();
			const result = await databaseHelper.simpleDatabaseQuery(this.app, getChatIdsSql);
			return result
		}
		catch(error){
			console.log(error);
		}
	}
}

module.exports = () => {
	return telegramBotHelper;
}