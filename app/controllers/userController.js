export async function createUser(app, req, res) {
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

export function renderCreateUserPage(app, req, res) {
	res.render('user/createUser');
}

export async function renderManageUserPage(app, req, res) {
	const userModel = new app.app.models.userModel(app);
	try{
		const users = await userModel.getAllUsers();
		res.render('user/manageUsers', {users: users});
	}
	catch(error){
		res.status(500).send(error);
	}
}

export async function deleteUser(app, req, res) {
	const idUser = req.params.idUser;

	const userModel = new app.app.models.userModel(app);
	try{
		await userModel.deleteUser(idUser);
		res.status(200).send('Ok');
	}
	catch(error){
		res.status(500).send(error);
	}
}