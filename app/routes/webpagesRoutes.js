module.exports = (app) => {
	app.get('/login', (req, res) => {
		app.app.controllers.loginController.renderLoginPage(app, req, res);
	});

	app.post('/login', (req, res) => {
		app.app.controllers.loginController.userLogin(app, req, res);
	});

	app.post('/user', (req, res) => {
		app.app.controllers.loginController.createUser(app, req, res);
	});

	app.get('/incidentsPage/search', (req, res) => {
		app.app.controllers.incidentController.renderSearchPage(app, req, res);
	});

	// Send some image of ./app/public/photo directory to client
	app.get('/integrations/telegramConfig', (req, res) => {
		app.app.controllers.telegramBotController.renderTelegramIntegrationPage(app, req ,res);
	});
}