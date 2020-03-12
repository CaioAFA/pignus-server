function incidentModel(){
	// Ex de utilização:
	/*
		const incidentModel = new app.app.models.incidentModel();
		incidentModel.save(app, {timestamp: '1998-12-29 00:00:00', photoPath: './var/naosei', percentage: '0.7'});
	*/
	this.save = (app, incidentData) => {
		const dbConnection = app.config.dbConfig;
		const valuesToInsert = [
			[
				incidentData.timestamp,
				incidentData.photoPath,
				incidentData.percentage
			]
		]
		const saveQuery = "" +
			'INSERT ' +
			'INTO incident (timestamp, photo_path, percentage) ' +
			'VALUES (?)';
		dbConnection.query(saveQuery, valuesToInsert, (error) => {
			if(error){
				throw error;
			}
		})
	}
}

module.exports = () => {
	return incidentModel;
}