module.exports.createUser = async (app, req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userModel = new app.app.models.userModel(app);
	try{
		await userModel.createUser(username, password);
		res.status(200).send('Ok');
	}
	catch(error){
		res.status(500).send(error);
	}
}

module.exports.renderCreateUserPage = async (app, req, res) => {
	res.render('user/createUser');
}