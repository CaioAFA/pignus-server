class telegramBotModel {
	constructor(app) {
		this._dbConnection = app.config.dbConfig;

		this.registerTelegramUserInDatabase = function (req) {
			const username = req.body.username;
			const chatId = req.body.chatId;
			const userValues = [
				username,
				chatId
			];

			const registerUserIdSql = "" +
				"INSERT " +
				"INTO telegramBotUser (username, chatId) " +
				`VALUES ('${username}', ${chatId})`;

			return new Promise((resolve, reject) => {
				this._dbConnection.query(registerUserIdSql, (error, result) => {
					if (error) {
						reject(error);
					}

					resolve(result);
				});
			});
		};

		this.getTelegramUsers = function () {
			const getTelegramUsersSql = "" +
				"SELECT * " +
				"FROM telegramBotUser";

			return new Promise((resolve, reject) => {
				this._dbConnection.query(getTelegramUsersSql, (error, result) => {
					if (error) {
						reject(error);
					}

					resolve(result);
				});
			});

		};

		this.deleteTelegramUser = function (userId) {
			const deleteTelegramUser = "" +
				"DELETE " +
				"FROM telegramBotUser " +
				`WHERE iduser = ${userId}`;

			return new Promise((resolve, reject) => {
				this._dbConnection.query(deleteTelegramUser, (error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				});
			});

		};
	}
}

export default () => {
	return telegramBotModel;
}