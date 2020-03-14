function incidentModel(app){
	this.dbConnection = app.config.dbConfig;

	// Ex de utilização:
	/*
		const incidentModel = new app.app.models.incidentModel(app);
		incidentModel.save({timestamp: '1998-12-29 00:00:00', photoPath: './var/naosei', percentage: '0.7'});
	*/
	this.save = (incidentData) => {
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
		this.dbConnection.query(saveQuery, valuesToInsert, (error) => {
			if(error){
				throw error;
			}
		})
	}

	this.getLastsNIncidents = (numberOfIncidents) => {
		const getLastsNIncidentsQuery = "" +
			"SELECT * " +
			"FROM security_system.incident " +
			"ORDER BY idincident DESC " +
			`LIMIT ${numberOfIncidents}`;

		return new Promise((resolve, reject) => {
			this.dbConnection.query(getLastsNIncidentsQuery, (error, lastsNIncidentes) => {
				if(error){
					return reject(error);
				}
				resolve(lastsNIncidentes);
			});
		});
	}
}

module.exports = () => {
	return incidentModel;
}