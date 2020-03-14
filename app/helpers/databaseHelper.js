function databaseHelper(app){
	this.simpleDatabaseQuery = (app, query) => {
		const dbConnection = app.config.dbConfig;

		return new Promise ((resolve, reject) => {
			dbConnection.query(query, (error, result) => {
				if(error){
					reject(error);
				}
				resolve(result);
			})
		});
	}
}

module.exports = () => {
	return databaseHelper;
}