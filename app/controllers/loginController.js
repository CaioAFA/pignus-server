module.exports.renderLoginPage = (app, req, res) => {
	res.render('login/loginPage.ejs');
}

module.exports.userLogin = (app, req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if(username == 'admin' && password == 'admin'){
		res.status(200).send('Ok');
	}
	else{
		res.status(403).send('Usuário inválido.');
	}
}