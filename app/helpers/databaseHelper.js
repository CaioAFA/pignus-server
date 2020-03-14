module.exports = function(app){
	this.simpleDatabaseQuery = () => {
		const dbConnection = app.config.dbConnection;

		return new Promise ((resolve, reject) => {
			dbConnection.query(query, (error, result) => {
				if(error){
					reject(error);
				}
				resolve(error);
			})
		});
	}
}