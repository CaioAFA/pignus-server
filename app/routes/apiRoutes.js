module.exports = (app) => {
	// Send some image of ./app/public/photo directory to client
	app.get('/photo/:photoName', (req, res) => {
		app.app.controllers.photoController.getPhoto(app, req, res);
	});

	// Receive some image from some client
	app.post('/photo', (req, res) => {
		app.app.controllers.photoController.uploadPhoto(app, req, res);
	});

	// Get the lasts incidents
	app.get('/incidents/:numberOfIncidents', (req, res) => {
		app.app.controllers.incidentController.getIncidents(app, req, res);
	});

	app.get('/searchIncidents', (req, res) => {
		app.app.controllers.incidentController.searchIncidents(app, req, res);
	});

	app.get('/incident/info', (req, res) => {
		app.app.controllers.incidentController.getIncidentInfo(app, req, res);
	});

	app.get('/telegramBot/users', (req, res) => {
		app.app.controllers.telegramBotController.getTelegramUsers(app, req, res);
	});

	// Register Telegram Bot Id
	app.post('/telegramBot/register', (req, res) => {
		app.app.controllers.telegramBotController.registerTelegramUser(app, req, res);
	});

	app.delete('/telegramBot/:userId', (req, res) => {
		app.app.controllers.telegramBotController.deleteTelegramUser(app, req, res);
	});

	app.post('/telegramBot/test', (req, res) => {
		app.app.controllers.telegramBotController.sendTestMessage(app, req, res);
	});

	app.post('/login', (req, res) => {
		app.app.controllers.loginController.userLogin(app, req, res);
	});

	app.post('/user', (req, res) => {
		app.app.controllers.userController.createUser(app, req, res);
	});
}