module.exports = (app) => {
	app.get('/', (req, res) => {
		app.app.controllers.someController.someFunction(app, req, res);
	});
}