module.exports.renderLoginPage = (app, req, res) => {
	res.render('login/loginPage.ejs');
}

module.exports.userLogin = async (app, req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userModel = new app.app.models.userModel(app);
	try{
		const isAuthenticated = await userModel.authenticate(username, password);
		if(isAuthenticated){
			res.status(200).send('Ok');
		}
		else{
			res.status(403).send('Usuário inválido.');
		}
	}
	catch(error){
		res.status(500).send(error);
	}

}

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