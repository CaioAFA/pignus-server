module.exports.someFunction = (app, req, res) => {
	console.log('Some Controller Function');
	app.app.models.someModel.someModelFunction(app, req, res);
	res.send('Server Example. See Console.');
}