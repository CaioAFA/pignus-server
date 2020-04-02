function incidentModel(app){
	this.dbConnection = app.config.dbConfig;

	this.authenticate = (username, password) => {
		return new Promise((resolve, reject) => {
			const SQL = `
				SELECT *
				FROM user
				WHERE username = '${username}' AND password = '${password}';
			`;
			this.dbConnection.query(SQL, (error, result) => {
				if(error){
					reject(error);
				}

				if(result.length == 0)
					resolve(false);

				resolve(true);
			});
		});
	}

	this.createUser = (username, password) => {
		return new Promise((resolve, reject) => {
			const SQL = `
				INSERT
				INTO user (username, password)
				VALUES ('${username}', '${password}');
			`;
			this.dbConnection.query(SQL, (error) => {
				if(error){
					reject(error);
				}
				resolve();
			});
		});
	}

	this.getAllUsers = () => {
		return new Promise((resolve, reject) => {
			const SQL = `
				SELECT *
				FROM user;
			`;
			this.dbConnection.query(SQL, (error, result) => {
				if(error){
					reject(error);
				}
				resolve(result);
			});
		});
	}

	this.deleteUser = (idUser) => {
		return new Promise((resolve, reject) => {
			const SQL = `
				DELETE
				FROM user
				WHERE iduser = ${idUser};
			`;
			this.dbConnection.query(SQL, (error) => {
				if(error){
					reject(error);
				}
				resolve();
			});
		});
	};
}

module.exports = () => {
	return incidentModel;
}