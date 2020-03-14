module.exports = (app) => {
	// Send some image of ./app/public/photo directory to client
	app.get('/integrations/telegramConfig', (req, res) => {
		app.app.controllers.telegramBotController.renderTelegramIntegrationPage(app, req ,res);
	});
}