export function renderLoginPage(app, req, res) {
	res.render('login/loginPage.ejs');
}

export async function userLogin(app, req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const userModel = new app.app.models.userModel(app);
	try{
		const isAuthenticated = await userModel.authenticate(username, password);
		if(isAuthenticated){
			req.session.isAuthenticated = true;
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