module.exports = (app) => {
	// Send some image of ./app/public/photo directory to client
	app.get('/photo/:photoName', (req, res) => {
		app.app.controllers.photoController.getPhoto(app, req, res);
	});

	// Receive some image from some client
	app.post('/photo', (req, res) => {
		app.app.controllers.photoController.uploadPhoto(app, req, res);
	});
}