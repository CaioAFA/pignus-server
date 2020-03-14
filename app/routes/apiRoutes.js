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

	app.get('/telegramBot/users', (req, res) => {
		app.app.controllers.telegramBotController.getTelegramUsers(app, req, res);
	});

	// Register Telegram Bot Id
	app.post('/telegramBot/register', (req, res) => {
		app.app.controllers.telegramBotController.registerTelegramUser(app, req, res);
	})
}